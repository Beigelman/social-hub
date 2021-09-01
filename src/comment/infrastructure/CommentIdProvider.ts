import { makeIdProvider } from '@/_lib/IdProvider';
import { CommentId } from '@/comment/domain/CommentId';

const CommentIdProvider = makeIdProvider<CommentId>('CommentId');

export { CommentIdProvider };
