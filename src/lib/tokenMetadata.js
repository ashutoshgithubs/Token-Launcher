/**
 * Build the SPL token-2022 metadata JSON payload that gets uploaded
 * to IPFS / Uploadcare and pinned to the mint.
 *
 * Extracted from `src/components/GenerateToken.jsx` so the contract is
 * testable without a wallet, an RPC, or a network call.
 *
 * @param {{name:string, symbol:string, description?:string, image?:string|null}} input
 * @returns {{name:string, symbol:string, description:string, image:string|null}}
 */
export function buildTokenMetadata({ name, symbol, description = "", image = null }) {
  return {
    name: String(name ?? ""),
    symbol: String(symbol ?? ""),
    description: String(description ?? ""),
    image: image ?? null,
  };
}
