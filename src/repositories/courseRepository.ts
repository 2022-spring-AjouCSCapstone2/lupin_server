import { dataSource } from '~/config';
import { Course } from '~/models';

export const courseRepository = dataSource.getRepository(Course);
