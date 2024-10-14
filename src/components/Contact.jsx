
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { toast } from '@/hooks/use-toast'
import { Rocket, Star, Send } from "lucide-react"

export default function Contact() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [buttonText, setButtonText] = useState("Launch Transmission");
  const formDetails = {firstName, lastName,email,message};
  const emailBackend = import.meta.env.VITE_Email;


  const handleSubmit = async() => {
    setButtonText("Launching...");
    let response;
    try {
      response = await fetch(emailBackend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });
      setButtonText("✔ Launched");
      toast({
        title: "Message Launched into cosmos!",
        description: "Your message has been sent to the creator. Thank you!",
        
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setButtonText("Launch Transmission");
      //console.log(response);
    } catch (error) {
        toast({
            title: "Failed",
            description: "Too much traffic in the cosmos. Try after some time..",
            variant: "destructive",
          });
      console.log(error.message);
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto p-8 overflow-hidden mt-10">
      <div className="absolute inset-0 z-0"></div>
      {/* Animated stars */}
      {[...Array(50)].map((_, i) => (
        <Star
          key={i}
          className="absolute animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
          size={Math.random() * 4 + 1}
        />
      ))}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Launch Your Message to the Creator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
             First Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
            Last Name
            </label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
             Communication Channel
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium ">
              Your Transmission
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
             
              placeholder="Type your message here..."
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full  font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            <Send className="mr-2 h-5 w-5" />
            {buttonText}
          </Button>
        </form>
      </div>
      <Rocket className="absolute bottom-4 right-4  animate-bounce" size={32} />
    </div>
  )
}