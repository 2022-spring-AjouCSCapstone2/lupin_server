import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { day } from '~/config';
import { Course } from '~/models/Course';

@Entity({ name: 'timetables' })
export class Timetable {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'enum', enum: day, nullable: true })
    day!: day;

    // 0000 ~ 2359
    @Column()
    startTime!: string;

    // 0000 ~ 2359
    @Column()
    endTime!: string;

    @Column({ nullable: true })
    place!: string;

    @ManyToOne(() => Course, (course) => course.timetables, { cascade: true })
    course!: Course;
}
