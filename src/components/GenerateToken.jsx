import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '@/hooks/use-toast';
import { TOKEN_2022_PROGRAM_ID, createInitializeMintInstruction, getMintLen, ExtensionType, TYPE_SIZE,LENGTH_SIZE, createInitializeMetadataPointerInstruction, getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction, createMintToInstruction } from '@solana/spl-token';
import { createInitializeInstruction,pack } from '@solana/spl-token-metadata';
import { RxCross2 } from "react-icons/rx";
import { UploadClient } from "@uploadcare/upload-client";
import { FaSpinner } from 'react-icons/fa';
import { buildTokenMetadata } from '@/lib/tokenMetadata';



export default function GenerateToken() {
  
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [btnText, setBtnText] = useState("Create Token")
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [decimals, setDecimals] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 
  
  const [loading, setLoading] = useState("Upload Image");
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const wallet = useWallet();
  const client = new UploadClient({ publicKey: import.meta.env.VITE_UploadClientId });

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'web3solana'); 
    formData.append('folder', 'Ashutosh'); 

    try {
      setLoading("Uploading...");
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setLoading("Uploaded");
      toast({
        title: 'Image Uploaded',
        description: 'Image uploaded successfully!',
      });
      setLoading("Upload Image");
      // console.log(data.secure_url);
      setImage(data.secure_url); 
      // console.log(response);
      // console.log(image);
    } catch (error) {
      setLoading("Upload Image");
      console.error('Image upload failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image. Try again.',
        variant: 'destructive',
      });
    }
  };

  const createAndUploadMetadata = async (name, symbol, description, imageUrl) => {
    const metadata = JSON.stringify(
      buildTokenMetadata({ name, symbol, description, image: imageUrl })
    );

    const metadataFile = new File([metadata], "metadata.json", { type: "application/json" });

    try {
        const result = await client.uploadFile(metadataFile);
        return result.cdnUrl;
    } catch (error) {
        console.error("Upload failed:", error);
        throw error;
    }
};
  // Token creation function
  const createToken = async () => {
    if (!publicKey || !signTransaction) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to create a token.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setBtnText("Creating...")
      const mintKeypair = Keypair.generate();
      let metadataUri = await createAndUploadMetadata(name, symbol, description, image);
    // console.log(metadataUri);

      if (!metadataUri) {
        toast({
          title: 'Metadata Error',
          description: 'Failed to generate metadata URI, using custom URI',
          variant: 'destructive',
        });
        metadataUri = import.meta.env.VITE_DEFAULT_URI
    };
        const metadata = {
            mint: mintKeypair.publicKey,
            name: name,
            symbol: symbol,
            uri: metadataUri,
            additionalMetadata: [],
        };

        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: mintKeypair.publicKey,
                space: mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(mintKeypair.publicKey, publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeMintInstruction(mintKeypair.publicKey, decimals, publicKey, null, TOKEN_2022_PROGRAM_ID),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: publicKey,
                updateAuthority: publicKey,
            }),
        );
            
        transaction.feePayer = publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.partialSign(mintKeypair);

        const res = await wallet.sendTransaction(transaction, connection);
        // console.log(res+'\n');
        // console.log(transaction);
        toast({
          title: 'Token Mint',
          description: `Token mint created at ${mintKeypair.publicKey.toBase58()}`,
        });

        //Associated TOKEN
        const associatedToken = getAssociatedTokenAddressSync(
          mintKeypair.publicKey,
          publicKey,
          false,
          TOKEN_2022_PROGRAM_ID,
      );

      // console.log("AT: ",associatedToken.toBase58())

      const transaction2 = new Transaction().add(
          createAssociatedTokenAccountInstruction(
              publicKey,
              associatedToken,
              publicKey,
              mintKeypair.publicKey,
              TOKEN_2022_PROGRAM_ID,
          )
      );
      // console.log("Txn2: ", transaction2)
      const res2 = await wallet.sendTransaction(transaction2, connection);
      // console.log("RES2: ", res2)

      const transaction3 = new Transaction().add(
        createMintToInstruction(mintKeypair.publicKey, associatedToken, publicKey, supply * Math.pow(10, decimals), [], TOKEN_2022_PROGRAM_ID)
      )

      // console.log("Txn3: ", transaction3)
     
      const res3 = await wallet.sendTransaction(transaction3, connection);
      // console.log("RES3: ", res3)

      toast({
        title: 'Congratulations!',
        description: "Token is created Successfully!",
      });

      // Reset form
      setBtnText("Create Token")
      setName('');
      setSymbol('');
      setDecimals('');
      setSupply('')
      setDescription('');
      setImage(null);
    } catch (error) {
      // console.log('Error creating token:', error);
      setBtnText("Create Token")
      toast({
        title: 'Error',
        description: 'There was an error creating your token. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-xl shadow-xl shadow-slate-300 mt-10">
      <h2 className="text-2xl font-bold mb-6">Create Solana Token</h2>

      <div className="mb-6">
       {
        !image ? (
          <label
          htmlFor="image-upload"
          className="block w-full p-4 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <span>{loading}</span>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
        ):(
          <div className='flex justify-center gap-y-1'>
            <img src={image} alt='img' className='w-30 h-36 rounded-md'></img>
            <button className='-mt-40' onClick={()=>setImage(null)} > <RxCross2 size={22} /> </button>
          </div>
        )
       }
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Token Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Token Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
       
        <Input
          placeholder="Token Decimals"
          type="number"
          value={decimals}
          onChange={(e) => setDecimals(e.target.value)}
        />
         <Input
          placeholder="Initial Supply"
          value={supply}
          onChange={(e) => setSupply(e.target.value)}
        />
        <Textarea
          placeholder="Token Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button
          onClick={createToken}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
          {btnText === "Creating..." ? (
            <FaSpinner className="animate-spin text-3xl text-white mb-3 mt-2" />
          ) : (
            btnText
          )}
      </Button>
    </div>
  );
}

