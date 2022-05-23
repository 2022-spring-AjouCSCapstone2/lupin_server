import { dataSource } from '~/config';
import { Post } from '~/models';

export const postRepository = dataSource.getRepository(Post);
