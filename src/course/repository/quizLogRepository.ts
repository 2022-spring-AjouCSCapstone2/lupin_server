import { dataSource } from '~/config';
import { QuizLog } from '~/models/QuizLog';

export const quizLogRepository = dataSource.getRepository(QuizLog);
