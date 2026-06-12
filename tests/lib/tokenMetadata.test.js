import { describe, it, expect } from "vitest";
import { buildTokenMetadata } from "../../src/lib/tokenMetadata.js";

describe("buildTokenMetadata", () => {
  it("preserves the user-typed description (regression: #14)", () => {
    const out = buildTokenMetadata({
      name: "Doge",
      symbol: "DOGE",
      description: "much wow, very token",
      image: "https://cdn.example/doge.png",
    });
    expect(out.description).toBe("much wow, very token");
  });

  it("does NOT include decimals in the metadata payload", () => {
    // The old buggy call site passed `decimals` as the description argument.
    // This test makes sure a stray `decimals` key can never sneak in.
    const out = buildTokenMetadata({
      name: "A",
      symbol: "A",
      description: "hi",
      image: null,
    });
    expect(Object.keys(out).sort()).toEqual(["description", "image", "name", "symbol"]);
    expect("decimals" in out).toBe(false);
  });

  it("serializes to a stable JSON shape", () => {
    const out = buildTokenMetadata({
      name: "X",
      symbol: "X",
      description: "",
      image: null,
    });
    expect(JSON.stringify(out)).toBe(
      JSON.stringify({ name: "X", symbol: "X", description: "", image: null })
    );
  });

  it("coerces nullish inputs to safe strings", () => {
    const out = buildTokenMetadata({
      name: undefined,
      symbol: null,
      description: undefined,
      image: undefined,
    });
    expect(out).toEqual({ name: "", symbol: "", description: "", image: null });
  });
});
