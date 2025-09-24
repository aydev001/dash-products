import z from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  image: z.string().url("Image must be a valid URL"),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  categoryId: z.string().min(1, "Category selection is required"),
})
