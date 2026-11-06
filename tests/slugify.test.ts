import { describe, expect, it } from "vitest";
import { slugify } from "../src/utils.js";

describe("slugify edge hyphens (issue #6)", () => {
  it("strips trailing hyphens from names ending with punctuation", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("strips leading and trailing hyphens from padded names", () => {
    expect(slugify("  Spaced  ")).toBe("spaced");
  });

  it("keeps interior hyphens", () => {
    expect(slugify("Mr. Coffee")).toBe("mr-coffee");
    expect(slugify("USB-C Cable")).toBe("usb-c-cable");
  });
});
