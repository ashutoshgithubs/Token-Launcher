import { describe, it, expect } from "vitest";
import { parseSolAmount, isValidSolAmount } from "../../src/lib/solAmount.js";

describe("parseSolAmount", () => {
  it.each([
    ["1", 1],
    ["1.5", 1.5],
    ["  2.0  ", 2.0],
    ["+3", 3],
    ["0.0001", 0.0001],
  ])("parses %s as %s", (input, expected) => {
    expect(parseSolAmount(input)).toBe(expected);
  });

  it.each([
    ["", "empty string"],
    ["   ", "whitespace only"],
    ["abc", "non-numeric"],
    ["1.2.3", "multiple dots"],
    ["1e", "trailing exponent"],
    ["1,5", "comma decimal"],
    ["0", "zero"],
    ["-1", "negative"],
    ["-1.5", "negative decimal"],
    ["NaN", "literal NaN"],
    ["Infinity", "literal Infinity"],
    [null, "null"],
    [undefined, "undefined"],
    [123, "number, not string"],
    [true, "boolean"],
  ])("rejects %s (%s)", (input) => {
    expect(parseSolAmount(input)).toBeNull();
  });
});

describe("isValidSolAmount", () => {
  it("returns true for valid SOL amounts", () => {
    expect(isValidSolAmount("1")).toBe(true);
    expect(isValidSolAmount("0.5")).toBe(true);
  });

  it("returns false for invalid SOL amounts", () => {
    expect(isValidSolAmount("")).toBe(false);
    expect(isValidSolAmount("-1")).toBe(false);
    expect(isValidSolAmount("abc")).toBe(false);
  });
});
