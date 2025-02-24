import { z } from "zod";
import { bookRecordSchema, bookSchema, optionSchema } from "./schema";

export type Book = z.infer<typeof bookSchema>;
export type Option = z.infer<typeof optionSchema>;
export type BookRecord = z.infer<typeof bookRecordSchema>;
