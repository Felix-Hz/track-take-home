import { z } from "zod";

export const Insight = z.object({
  id: z.number().int().min(0),
  brand: z.number().int().min(0).describe("Brand ID"),
  createdAt: z.date(),
  text: z.string().min(1, "Insight can't be empty").max(
    360,
    "Insight can't be longer than 360 characters",
  ),
});

export type Insight = z.infer<typeof Insight>;
