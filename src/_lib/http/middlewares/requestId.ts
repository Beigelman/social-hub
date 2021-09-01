import { RequestHandler } from 'express';
import { v4 } from 'uuid';

const requestId =
  (idProvider: () => string = v4): RequestHandler =>
  (req, res, next) => {
    req.id = idProvider();

    next();
  };

export { requestId };
