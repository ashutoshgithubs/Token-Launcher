/**
 * Parse a user-typed SOL amount into a finite positive number,
 * or return null when the input is invalid for a transfer.
 *
 * Valid inputs:
 *   "1", "1.5", "  2.0  " (whitespace trimmed)
 *   "+3" (explicit positive)
 *
 * Invalid inputs (return null):
 *   "", "  ", null, undefined
 *   "abc", "1.2.3", "1e", "1,5"
 *   "0", "-1", "-1.5"
 *   "NaN", "Infinity", "-Infinity"
 *   anything that does not match /^\s*\+?\d+(\.\d+)?\s*$/
 *
 * Extracted from src/components/Send.jsx, Airdrop.jsx and LaunchFuel.jsx
 * so the three call sites share one tested validator.
 */
const SOL_AMOUNT_RE = /^\s*\+?\d+(\.\d+)?\s*$/;

export function parseSolAmount(raw) {
  if (raw === null || raw === undefined) return null;
  if (typeof raw !== "string") return null;
  if (!SOL_AMOUNT_RE.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function isValidSolAmount(raw) {
  return parseSolAmount(raw) !== null;
}
