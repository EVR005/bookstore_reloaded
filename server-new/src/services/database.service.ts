// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { books?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const booksCollection: mongoDB.Collection = db.collection(
    process.env.BOOKS_COLLECTION_NAME!
  );

  collections.books = booksCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${booksCollection.collectionName}`
  );
}
