import { dataSource } from '~/config';
import { User } from '~/models';

export const userRepository = dataSource.getRepository(User);
