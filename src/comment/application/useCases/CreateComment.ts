import { ApplicationService } from '@/_lib/DDD';
import { ArticleRepository } from '@/article/domain/ArticleRepository';
import { Comment } from '@/comment/domain/Comment';
import { CommentRepository } from '@/comment/domain/CommentRepository';

type Dependencies = {
  commentRepository: CommentRepository;
  articleRepository: ArticleRepository;
};

type CreateCommentDTO = Readonly<{
  body: string;
  articleId: string;
}>;

type CreateComment = ApplicationService<CreateCommentDTO, string>;

const makeCreateComment =
  ({ commentRepository, articleRepository }: Dependencies): CreateComment =>
  async payload => {
    const article = await articleRepository.findById(payload.articleId);

    const id = await commentRepository.getNextId();

    const comment = Comment.create({
      id,
      body: payload.body,
      articleId: article.id,
    });

    await commentRepository.store(comment);

    return id.value;
  };

export { makeCreateComment };
export type { CreateComment };
