"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(title, isbn, author, description, published_date, publisher, _id) {
        this.title = title;
        this.isbn = isbn;
        this.author = author;
        this.description = description;
        this.published_date = published_date;
        this.publisher = publisher;
        this._id = _id;
    }
}
exports.default = Book;
