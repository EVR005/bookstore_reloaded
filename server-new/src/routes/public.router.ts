// External Dependencies
import express, { Request, Response } from "express";
// Global Config
export const publicRouter = express.Router();

publicRouter.use(express.json());

//ROUTES
publicRouter.get("/health", (_: Request, res: Response) => {
  res.status(200).send("healthy");
});
