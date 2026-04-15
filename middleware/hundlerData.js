import Book from "../data/data.json" with { type: "json" };
export const hundlerData = (req, res, next) => {
  const { page } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = 5;

  const startWith = (pageNumber - 1) * pageSize;
  const endWith = startWith + pageSize;

  const responstData = {
    data: Book.slice(startWith, endWith),
  };
  res.json(responstData);
};
