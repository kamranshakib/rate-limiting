import rateLimit from "express-rate-limit";

export const RateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  message: "to many request, try again after 1 minate",
});
