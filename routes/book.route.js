import { Router } from "express";
import books from "../controllers/book.controller.js";
import { hundlerData } from "../middleware/hundlerData.js";
import { RateLimit } from "../middleware/rateLimit.js";
import { auth } from "../middleware/user.auth.js";

const router = Router();

router.get("/", books);
router.get("/getData", RateLimit, hundlerData);
router.get("/getDataAuth", auth, hundlerData);

export default router;
