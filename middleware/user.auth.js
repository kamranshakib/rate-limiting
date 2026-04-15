import basicAuth from "express-basic-auth";
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
export const auth = basicAuth({
  users: users.reduce((acc, user) => {
    acc[user.username] = user.password;
    return acc;
  }),
  challenge: true,
});
