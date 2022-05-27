import { dataSource } from '~/config';
import { Comment } from '~/models';

export const commentRepository = dataSource.getRepository(Comment);
