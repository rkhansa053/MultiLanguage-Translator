import rateLimit from 'express-rate-limit';

export const translationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: {
    success: false,
    error: 'Too many translation requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});