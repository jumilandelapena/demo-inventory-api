import { describe, expect, it } from "vitest";
import { applyDiscount } from "../src/utils.js";

describe("applyDiscount (issue #2)", () => {
  it("applies the discount as a percentage, not a dollar amount", () => {
    expect(applyDiscount(399, 10)).toBe(359.1);
    expect(applyDiscount(100, 25)).toBe(75);
    expect(applyDiscount(50, 100)).toBe(0);
  });
});
