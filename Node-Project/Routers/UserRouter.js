import express from "express";
import UsersController from "../Controllers/UsersController.js";

const UsersRouter = express.Router();
UsersRouter.get("/", UsersController.getList);
UsersRouter.get("/:id", UsersController.getById);
UsersRouter.post("/", UsersController.post);
UsersRouter.put("/:id", UsersController.put);
UsersRouter.delete("/:id", UsersController.delete);
export default UsersRouter;
