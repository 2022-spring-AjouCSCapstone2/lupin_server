import { dataSource } from '~/config';
import { Statistics } from '~/models';

export const statisticsRepository = dataSource.getRepository(Statistics);
