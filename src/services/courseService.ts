import { courseRepository } from '~/repositories';

export const getCourses = () => {
    return courseRepository.find({
        relations: {
            professor: true,
        },
    });
};

export const getMyCourses = (id: number) => {
    return courseRepository.findBy({ students: { id } });
};

export const getCourseByCourseId = (courseId: string) => {
    return courseRepository.findOneBy({ courseId });
};
