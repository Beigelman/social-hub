import { handler } from '@/_lib/http/handler';
import { DeleteArticle } from '@/article/application/useCases/DeleteArticle';

type Dependencies = {
  deleteArticle: DeleteArticle;
};

const deleteArticleHandler = handler(({ deleteArticle }: Dependencies) => async (req, res) => {
  const { articleId } = req.params;

  await deleteArticle(articleId);

  res.sendStatus(204);
});

export { deleteArticleHandler };
