import express from "express";
import bookRoute from "./routes/book.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
app.use(express.json());


app.use("/register", userRoute);
app.use("/", bookRoute);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
