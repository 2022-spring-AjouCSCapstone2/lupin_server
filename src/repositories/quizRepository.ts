import { dataSource } from '~/config';
import { Quiz } from '~/models';

export const quizRepository = dataSource.getRepository(Quiz);
