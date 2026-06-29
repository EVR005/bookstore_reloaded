import express, { Request, Response } from "express";
import { connectToDatabase } from "./services/database.service";
import { booksRouter } from "./routes/books.router";
import { publicRouter } from "./routes/public.router";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT!;

connectToDatabase()
  .then(() => {
    app.use(cors());

    app.use("/books", booksRouter);

    app.use("/public", publicRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
