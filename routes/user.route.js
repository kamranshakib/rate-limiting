import express from "express";
import { register } from "../controllers/user.controller.js";

const Router = express.Router();

Router.post("/", register);

export default Router;
