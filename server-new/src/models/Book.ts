import { ObjectId } from "mongodb";

export default class Book {
  constructor(
    public title: string,
    public isbn: number,
    public author: string,
    public description: string,
    public published_date: Date,
    public publisher: string,
    public _id?: ObjectId
  ) {}
}
