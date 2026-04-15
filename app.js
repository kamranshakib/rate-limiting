import express from "express";
import bookRoute from "./routes/book.route.js";
import userRoute from "./routes/user.route.js";
import fs from "fs";

const app = express();
app.use(express.json());

if (!fs.existsSync("./data/token.json")) {
  fs.writeFileSync("./data/token.json", "[]");
}

app.use("/", userRoute);
app.use("/", bookRoute);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
