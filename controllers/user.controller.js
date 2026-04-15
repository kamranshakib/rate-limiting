import fs from "fs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { json } from "stream/consumers";

const userFilePath = "./data/user.json";
let users = [];
if (fs.existsSync(userFilePath)) {
  const userData = fs.readFileSync(userFilePath, "utf-8");
  users = JSON.parse(userData);
} else {
  console.log("file not found");
}
function writeUesrToFile(users) {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
}
export const register = (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }
    if (users.some((user) => user.username === username)) {
      return res.status(400).json({
        message: "username already exists",
      });
    }
    users.push({ username, password });
    writeUesrToFile(users);
    return res.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

export const login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }
  const user = users.find(
    (user) => user.username == username && user.password == password,
  );
  if (!user) return res.status(404).json({ message: "user not found" });

  const token = jwt.sign(
    { username: user.username, password: user.password },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  const generateToken = {
    token,
    generateAt: new Date().toISOString(),
  };
  const tokens = JSON.parse(fs.readFileSync("./data/token.json", "utf-8"));
  tokens.push(generateToken);
  fs.writeFileSync("./data/token.json", JSON.stringify(tokens, null, 2));
  return res.status(200).json({ message: "success", token });
};
