import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Message must have atleast 1 character" })
    .max(300, { message: "Message must have atmost 300 character" }),
});
