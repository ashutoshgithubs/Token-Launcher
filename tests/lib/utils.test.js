import { describe, it, expect } from "vitest";
import { cn } from "../../src/lib/utils.js";

describe("cn", () => {
  it("returns an empty string when called with no arguments", () => {
    expect(cn()).toBe("");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", false, null, undefined, "", 0, "bar")).toBe("foo bar");
  });

  it("flattens arrays of class names", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });

  it("supports object syntax (clsx-style)", () => {
    expect(cn({ foo: true, bar: false, baz: 1 })).toBe("foo baz");
  });

  it("resolves Tailwind conflicts (last class wins)", () => {
    // twMerge should drop the earlier conflicting utility
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("accepts a mix of strings, arrays, and objects in one call", () => {
    expect(
      cn("base", ["arr-1", { "obj-true": true, "obj-false": false }], null, "tail")
    ).toBe("base arr-1 obj-true tail");
  });

  it("returns a single space-separated string when the only input is a space", () => {
    // clsx trims; tailwind-merge drops whitespace
    expect(cn("  foo  ", "  bar  ").trim().split(/\s+/).sort()).toEqual(
      ["bar", "foo"]
    );
  });
});
