import { courseRepository } from '~/course';
import { day, userType } from '~/config';

export const getCourses = () => {
    return courseRepository.find({
        relations: ['professor', 'timetables'],
    });
};

export const getMyCourses = (id: number, type: string) => {
    if (type === userType.PROFESSOR) {
        return courseRepository.find({
            where: {
                professor: { id },
            },
            relations: ['professor', 'timetables'],
        });
    }
    return courseRepository.find({
        where: {
            students: {
                id,
            },
        },
        relations: ['professor', 'timetables'],
    });
};

export const getMyCourseByCourseId = (id: number, courseId: string) => {
    return courseRepository.findOne({
        where: {
            students: {
                id,
            },
            courseId,
        },
        relations: ['students'],
    });
};

export const getCourseByCourseId = (courseId: string) => {
    return courseRepository.findOne({
        where: {
            courseId,
        },
        relations: ['professor', 'timetables'],
    });
};

export const getTodayCourses = (id: number, type: string) => {
    const today = new Date().getDay();
    let dayParam;
    switch (today) {
        case 0:
            dayParam = 'SUNDAY';
            break;
        case 1:
            dayParam = 'MONDAY';
            break;
        case 2:
            dayParam = 'TUESDAY';
            break;
        case 3:
            dayParam = 'WEDNESDAY';
            break;
        case 4:
            dayParam = 'THURSDAY';
            break;
        case 5:
            dayParam = 'FRIDAY';
            break;
        case 6:
            dayParam = 'SATURDAY';
            break;
        default:
            dayParam = 'NODAY';
            break;
    }

    if (type === 'PROFESSOR') {
        return courseRepository.find({
            where: { professor: { id }, timetables: { day: day[dayParam] } },
            relations: ['professor', 'timetables'],
        });
    }
    return courseRepository.find({
        where: { students: { id }, timetables: { day: day[dayParam] } },
        relations: ['professor', 'timetables'],
    });
};
