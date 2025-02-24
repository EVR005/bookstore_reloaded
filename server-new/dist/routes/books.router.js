"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// Global Config
exports.booksRouter = express_1.default.Router();
exports.booksRouter.use(express_1.default.json());
//ROUTES
exports.booksRouter.get("/test", (req, res) => {
    res.send("book route testing!");
});
exports.booksRouter.get("/:value/:option", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    if (req.params.option == "publisher") {
        try {
            const books = (yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.find({
                publisher: { $regex: req.params.value, $options: "i" },
            }).toArray()));
            res.status(200).send(books);
        }
        catch (_f) {
            res.status(404).json({ nobooksfound: "No Books Found!" });
        }
    }
    else if (req.params.option == "title") {
        try {
            const books = (yield ((_b = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _b === void 0 ? void 0 : _b.find({
                title: { $regex: req.params.value, $options: "i" },
            }).toArray()));
            res.status(200).send(books);
        }
        catch (_g) {
            res.status(404).json({ nobooksfound: "No Books Found!" });
        }
    }
    else if (req.params.option == "bookid") {
        try {
            const books = (yield ((_c = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _c === void 0 ? void 0 : _c.find({
                isbn: { $regex: req.params.value, $options: "i" },
            }).toArray()));
            res.status(200).send(books);
        }
        catch (_h) {
            res.status(404).json({ nobooksfound: "No Books Found!" });
        }
    }
    else if (req.params.option == "published_date") {
        try {
            const books = (yield ((_d = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _d === void 0 ? void 0 : _d.find({
                published_date: { $gt: Date.parse(req.params.value) },
            }).toArray()));
            res.status(200).send(books);
        }
        catch (_j) {
            res.status(404).json({ nobooksfound: "No Books Found!" });
        }
    }
    else if (req.params.option == "author") {
        try {
            const books = (yield ((_e = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _e === void 0 ? void 0 : _e.find({
                author: { $regex: req.params.value, $options: "i" },
            }).toArray()));
            console.log(books);
            res.status(200).send(books);
        }
        catch (_k) {
            res.status(404).json({ nobooksfound: "No Books Found!" });
        }
    }
}));
exports.booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const books = (yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
        res.status(200).send(books);
    }
    catch (_b) {
        res.status(404).json({ nobooksfound: "No Books Found!" });
    }
}));
exports.booksRouter.get("/stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    let result = [];
    let date = new Date(new Date(new Date().getTime() - 7 * 60 * 60 * 24 * 1000).toISOString());
    try {
        const arg = yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.aggregate([
            {
                $match: {
                    published_date: {
                        $gt: date,
                    },
                },
            },
            { $count: "recently_published" },
        ]).toArray());
        result.push(arg[0]);
    }
    catch (_g) {
        res.json({ message: "stat fetch failed" });
    }
    try {
        const arg = yield ((_b = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _b === void 0 ? void 0 : _b.aggregate([
            {
                $match: {
                    updated_date: {
                        $gt: date,
                    },
                },
            },
            { $count: "recently_updated" },
        ]).toArray());
        result.push(arg[0]);
    }
    catch (_h) {
        res.json({ message: "stat fetch failed" });
    }
    try {
        const arg = yield ((_c = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _c === void 0 ? void 0 : _c.aggregate([
            { $group: { _id: "$publisher", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]).toArray());
        result.push(arg[0]);
    }
    catch (_j) {
        res.json({ message: "stat fetch failed" });
    }
    try {
        const arg = yield ((_d = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _d === void 0 ? void 0 : _d.aggregate([
            { $group: { _id: "$author", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]).toArray());
        result.push(arg[0]);
    }
    catch (_k) {
        res.json({ message: "stat fetch failed" });
    }
    try {
        const arg = yield ((_e = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _e === void 0 ? void 0 : _e.aggregate([
            { $sort: { published_date: 1 } },
            { $limit: 1 },
            { $project: { title: 1, published_date: 1 } },
        ]).toArray());
        result.push(arg[0]);
    }
    catch (_l) {
        res.json({ message: "stat fetch failed" });
    }
    try {
        const arg = yield ((_f = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _f === void 0 ? void 0 : _f.aggregate([
            { $sort: { published_date: -1 } },
            { $limit: 1 },
            { $project: { title: 1, published_date: 1 } },
        ]).toArray());
        result.push(arg[0]);
    }
    catch (_m) {
        res.json({ message: "stat fetch failed" });
    }
    res.json({ query_results: result });
    console.log({ query_results: result });
}));
exports.booksRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = {
            _id: new mongodb_1.ObjectId(req.params.id),
        };
        const book = (yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.findOne(query)));
        res.status(200).send(book);
    }
    catch (_b) {
        res.status(404).json({ nobooksfound: "No such Book Found!" });
    }
}));
exports.booksRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    try {
        yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.insertOne(req.body));
        res.status(200).send({ msg: "Book added successfully" });
    }
    catch (_b) {
        res.status(500).json({ nobooksfound: "Unable to add book!" });
    }
}));
exports.booksRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = {
            _id: new mongodb_1.ObjectId(req.params.id),
        };
        console.log(req.body);
        yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.findOneAndUpdate(query, { $set: req.body }));
        res.status(200).send({ msg: "Updated Successfully" });
    }
    catch (err) {
        res.status(404).json({ nobooksfound: err.message });
    }
}));
exports.booksRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const query = {
            _id: new mongodb_1.ObjectId(req.params.id),
        };
        yield ((_a = database_service_1.collections === null || database_service_1.collections === void 0 ? void 0 : database_service_1.collections.books) === null || _a === void 0 ? void 0 : _a.findOneAndDelete(query));
        res.status(200).send({ msg: "Book entry deleted Successfully" });
    }
    catch (_b) {
        res.status(404).json({ nobooksfound: "No such book!" });
    }
}));
