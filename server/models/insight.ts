import { z } from "zod";

export const NonNegativeInt = z.number().int().nonnegative();
export type NonNegativeInt = z.infer<typeof NonNegativeInt>;

export const PositiveInt = z.number().int().positive();
export type PositiveInt = z.infer<typeof PositiveInt>;

export const Insight = z.object({
  id: NonNegativeInt,
  brand: NonNegativeInt,
  createdAt: z.date(),
  text: z.string(),
});
export type Insight = z.infer<typeof Insight>;

export const CreateInsight = z.object({
  brand: PositiveInt,
  text: z.string().min(1).max(360),
});
export type CreateInsight = z.infer<typeof CreateInsight>;
