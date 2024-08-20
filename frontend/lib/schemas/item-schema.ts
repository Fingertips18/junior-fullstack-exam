import { z } from "zod";

export const itemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character." })
    .max(50, { message: "Name must have a maximum of 50 characters." }),
  desc: z
    .string()
    .min(6, { message: "Description must have at least 6 characters." })
    .max(100, {
      message: "Description must have a maximum of 100 characters.",
    }),
  price: z.preprocess((value) => {
    if (typeof value === "string") {
      return parseFloat(value);
    }

    return value;
  }, z.number({ message: "Price is required." }).positive({ message: "Price must be a positive number." })),
});
