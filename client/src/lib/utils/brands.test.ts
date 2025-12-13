import { getBrandNameById } from "../../lib/utils/brands.ts";
import { BRANDS } from "../consts.ts";
import { describe, expect, it } from "vitest";

describe("getBrandNameById", () => {
  it("should return the name of the brand", () => {
    const randomId = Math.floor(Math.random() * BRANDS.length);
    const brand = BRANDS[randomId];
    expect(getBrandNameById(brand.id)).toBe(brand.name);
  });

  it("should return null if the brand is not found", () => {
    expect(getBrandNameById(999)).toBe("Unknown Brand");
  });
});
