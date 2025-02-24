import { z } from "zod";

export const bookSchema = z.object({
  _id: z.string(),
  title: z.string(),
  author: z.string(),
  description: z.string(),
});

export const optionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const bookRecordSchema = z.object({
  title: z
    .string({
      required_error: "required field",
      invalid_type_error: "Title is required",
    })
    .min(5, "Title should be of minimum 5 characters!"),
  isbn: z
    .string({
      required_error: "required field",
      invalid_type_error: "ISBN is required",
    })
    .length(10, { message: "ISBN should have 10 digits!" }),
  author: z.string({
    required_error: "required field",
    invalid_type_error: "Author is required",
  }),
  description: z
    .string({
      required_error: "required field",
      invalid_type_error: "Description is required",
    })
    .max(150, { message: "Description should not exceed 150 characters!" }),
  published_date: z.coerce.date({
    required_error: "required field",
    invalid_type_error: "Published Date is required",
  }),
  publisher: z.string({
    required_error: "required field",
    invalid_type_error: "Publisher is required",
  }),
});
