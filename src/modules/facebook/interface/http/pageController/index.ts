import { Router } from 'express';

import { connectPageHandler } from './ConnectPageHandler';

type Dependencies = {
  apiRouter: Router;
};

const makePageController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/fb/connect', connectPageHandler);

  apiRouter.use(router);
};

export { makePageController };
