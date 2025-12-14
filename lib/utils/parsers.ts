import { z } from "zod";

const UInt16: z.ZodNumber = z
  .number()
  .int()
  .min(0)
  .max(Math.pow(2, 16) - 1);

export type Port = z.ZodPipeline<z.ZodNumber, z.ZodNumber>;
export const Port: Port = z.coerce.number()
  .pipe(UInt16);
