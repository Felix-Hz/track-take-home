import { BRANDS } from "../consts.ts";

export const getBrandNameById = (id: number): string => {
  return BRANDS.find((brand) => brand.id === id)?.name ?? "Unknown Brand";
};
