import jwt from "jsonwebtoken";
import fs from "fs";

const tokens = JSON.parse(fs.readFileSync("./data/token.json", "utf-8"));

export const jwtAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  const [bearer, token] = authorization.split(" ");
  console.log(bearer)

  if (!token) {
    return res.status(401).json({ message: "token not found" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      res.status(401).json({ message: "invalid token" });
    }

    req.user = decoded;
    next();
  });
};
