import { ApplicationService } from '@/_lib/DDD';
import { eventProvider } from '@/_lib/pubSub/EventEmitterProvider';
import { ArticleCreatedEvent } from '@/article/application/events/ArticleCreatedEvent';
import { Article } from '@/article/domain/Article';
import { ArticleRepository } from '@/article/domain/ArticleRepository';

type Dependencies = {
  articleRepository: ArticleRepository;
};

type CreateArticleDTO = {
  title: string;
  content: string;
};

type CreateArticle = ApplicationService<CreateArticleDTO, string>;

const makeCreateArticle = eventProvider<Dependencies, CreateArticle>(
  ({ articleRepository }, enqueue) =>
    async (payload: CreateArticleDTO) => {
      const id = await articleRepository.getNextId();

      const article = Article.create({
        id,
        title: payload.title,
        content: payload.content,
      });

      await articleRepository.store(article);

      enqueue(ArticleCreatedEvent.create(article));

      return id.value;
    }
);

export { makeCreateArticle };
export type { CreateArticle };
