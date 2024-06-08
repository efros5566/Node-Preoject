import express from "express";
import LinksController from "../Controllers/LinksController.js";

const LinksRouter = express.Router();
LinksRouter.get("/", LinksController.getList);
LinksRouter.get("/redirect/:id", LinksController.redirect);
LinksRouter.get("/:id", LinksController.getById);
LinksRouter.post("/", LinksController.post);
LinksRouter.put("/:id", LinksController.put);
LinksRouter.delete("/:id", LinksController.delete);
LinksRouter.get("/:id/click-data", LinksController.getClickData);

export default LinksRouter;
