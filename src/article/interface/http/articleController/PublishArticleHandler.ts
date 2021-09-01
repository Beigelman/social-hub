import { Request, Response } from 'express';

import { handler } from '@/_lib/http/handler';
import { PublishArticle } from '@/article/application/useCases/PublishArticle';

type Dependencies = {
  publishArticle: PublishArticle;
};

const publishArticleHandler = handler(({ publishArticle }: Dependencies) => async (req: Request, res: Response) => {
  const { articleId } = req.params;

  await publishArticle(articleId);

  res.sendStatus(204);
});

export { publishArticleHandler };
