import { Router } from 'express';

import { createCommentHandler } from '@/comment/interface/http/commentController/CreateCommentHandler';

type Dependencies = {
  apiRouter: Router;
};

const makeCommentController = ({ apiRouter }: Dependencies) => {
  const router = Router();

  router.post('/articles/:articleId/comments', createCommentHandler);

  apiRouter.use(router);
};

export { makeCommentController };
