// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Book from "../models/Book";
// Global Config
export const booksRouter = express.Router();

booksRouter.use(express.json());

//ROUTES
booksRouter.get("/test", (req: Request, res: Response) => {
  res.send("book route testing!");
});

booksRouter.get("/:value/:option", async (req: Request, res: Response) => {
  if (req.params.option == "publisher") {
    try {
      const books = (await collections?.books
        ?.find({
          publisher: { $regex: req.params.value, $options: "i" },
        })
        .toArray()) as Book[];
      res.status(200).send(books);
    } catch {
      res.status(404).json({ nobooksfound: "No Books Found!" });
    }
  } else if (req.params.option == "title") {
    try {
      const books = (await collections?.books
        ?.find({
          title: { $regex: req.params.value, $options: "i" },
        })
        .toArray()) as Book[];
      res.status(200).send(books);
    } catch {
      res.status(404).json({ nobooksfound: "No Books Found!" });
    }
  } else if (req.params.option == "bookid") {
    try {
      const books = (await collections?.books
        ?.find({
          isbn: { $regex: req.params.value, $options: "i" },
        })
        .toArray()) as Book[];
      res.status(200).send(books);
    } catch {
      res.status(404).json({ nobooksfound: "No Books Found!" });
    }
  } else if (req.params.option == "published_date") {
    try {
      const books = (await collections?.books
        ?.find({
          published_date: { $gt: Date.parse(req.params.value) },
        })
        .toArray()) as Book[];
      res.status(200).send(books);
    } catch {
      res.status(404).json({ nobooksfound: "No Books Found!" });
    }
  } else if (req.params.option == "author") {
    try {
      const books = (await collections?.books
        ?.find({
          author: { $regex: req.params.value, $options: "i" },
        })
        .toArray()) as Book[];
      console.log(books);
      res.status(200).send(books);
    } catch {
      res.status(404).json({ nobooksfound: "No Books Found!" });
    }
  }
});

booksRouter.get("/", async (req: Request, res: Response) => {
  try {
    const books = (await collections?.books?.find({}).toArray()) as Book[];
    res.status(200).send(books);
  } catch {
    res.status(404).json({ nobooksfound: "No Books Found!" });
  }
});

booksRouter.get("/stats", async (req: Request, res: Response) => {
  let result = [];
  let date = new Date(
    new Date(new Date().getTime() - 7 * 60 * 60 * 24 * 1000).toISOString()
  );
  try {
    const arg: any = await collections?.books
      ?.aggregate([
        {
          $match: {
            published_date: {
              $gt: date,
            },
          },
        },
        { $count: "recently_published" },
      ])
      .toArray();
    result.push(arg[0]);
  } catch {
    res.json({ message: "stat fetch failed" });
  }

  try {
    const arg: any = await collections?.books
      ?.aggregate([
        {
          $match: {
            updated_date: {
              $gt: date,
            },
          },
        },
        { $count: "recently_updated" },
      ])
      .toArray();
    result.push(arg[0]);
  } catch {
    res.json({ message: "stat fetch failed" });
  }

  try {
    const arg: any = await collections?.books
      ?.aggregate([
        { $group: { _id: "$publisher", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .toArray();
    result.push(arg[0]);
  } catch {
    res.json({ message: "stat fetch failed" });
  }

  try {
    const arg: any = await collections?.books
      ?.aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .toArray();
    result.push(arg[0]);
  } catch {
    res.json({ message: "stat fetch failed" });
  }

  try {
    const arg: any = await collections?.books
      ?.aggregate([
        { $sort: { published_date: 1 } },
        { $limit: 1 },
        { $project: { title: 1, published_date: 1 } },
      ])
      .toArray();
    result.push(arg[0]);
  } catch {
    res.json({ message: "stat fetch failed" });
  }

  try {
    const arg: any = await collections?.books
      ?.aggregate([
        { $sort: { published_date: -1 } },
        { $limit: 1 },
        { $project: { title: 1, published_date: 1 } },
      ])
      .toArray();
    result.push(arg[0]);
  } catch {
    res.json({ message: "stat fetch failed" });
  }
  res.json({ query_results: result });
  console.log({ query_results: result });
});

booksRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const query = {
      _id: new ObjectId(req.params.id),
    };
    const book = (await collections?.books?.findOne(query)) as Book;
    res.status(200).send(book);
  } catch {
    res.status(404).json({ nobooksfound: "No such Book Found!" });
  }
});

booksRouter.post("/create", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    await collections?.books?.insertOne(req.body);
    res.status(200).send({ msg: "Book added successfully" });
  } catch {
    res.status(500).json({ nobooksfound: "Unable to add book!" });
  }
});

booksRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const query = {
      _id: new ObjectId(req.params.id),
    };
    console.log(req.body);
    await collections?.books?.findOneAndUpdate(query, { $set: req.body });
    res.status(200).send({ msg: "Updated Successfully" });
  } catch (err: any) {
    res.status(404).json({ nobooksfound: err.message });
  }
});

booksRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const query = {
      _id: new ObjectId(req.params.id),
    };
    await collections?.books?.findOneAndDelete(query);
    res.status(200).send({ msg: "Book entry deleted Successfully" });
  } catch {
    res.status(404).json({ nobooksfound: "No such book!" });
  }
});
