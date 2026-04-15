import { Router } from "express";
import books from "../controllers/book.controller.js";
import { hundlerData } from "../middleware/hundlerData.js";
import { RateLimit } from "../middleware/rateLimit.js";
import { auth } from "../middleware/user.auth.js";
import { jwtAuth } from "../middleware/tokenAuth.js";

const router = Router();

router.get("/", books);
router.get("/getData", RateLimit, hundlerData);
router.get("/getDataAuth", auth, hundlerData);
router.get("/tokenAuth", jwtAuth, hundlerData);

export default router;
