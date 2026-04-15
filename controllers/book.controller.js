import Book from "../data/data.json" with { type: "json" };
const books = (_, res) => {
  res.status(200).json({
    message: "Welcome to the Book API",
    length: Book.length,
    data: Book,
  });
};

export default books;
