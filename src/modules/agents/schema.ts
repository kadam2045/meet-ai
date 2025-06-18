import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  instructions: z.string().min(1, { message: "instruction is required" }),
});
