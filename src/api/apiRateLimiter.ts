import RateLimit from 'express-rate-limit';
import urlParse from 'url-parse';
// import MongoStore from 'rate-limit-mongo';
// import { getConfig } from '../config';

export function createRateLimiter({
  max,
  windowMs,
  message,
}: {
  max: number;
  windowMs: number;
  message: string;
}) {
  return RateLimit({
    // store: new MongoStore({
    //   uri: getConfig().DATABASE_CONNECTION,
    // }),
    max,
    windowMs,
    message,
    skip: (req) => {
      if (req.method === 'OPTIONS') {
        return true;
      }

      if (
        req.originalUrl.endsWith('/import') ||
        req.originalUrl.indexOf('/api/navigation') === 0 ||
        req.originalUrl.indexOf('/api/category') === 0 ||
        req.originalUrl.indexOf('/api/general-page') ===
          0 ||
        req.originalUrl.indexOf('/api/broker') === 0 ||
        req.originalUrl.indexOf('/api/blog') === 0 ||
        req.originalUrl.indexOf('/api/comment') === 0
      ) {
        console.log('skipped', req.originalUrl);
        return true;
      }

      return false;
    },
  });
}
