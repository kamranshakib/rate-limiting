import fs from "fs";

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
