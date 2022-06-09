import { dataSource } from '~/config';
import { CourseLog } from '~/models';

export const courseLogRepository = dataSource.getRepository(CourseLog);
