import { Repository } from '@/_lib/DDD';
import { Comment } from '@/comment/domain/Comment';
import { CommentId } from '@/comment/domain/CommentId';

type CommentRepository = Repository<Comment.Type> & {
  findById(id: CommentId['value']): Promise<Comment.Type>;
};

export { CommentRepository };
