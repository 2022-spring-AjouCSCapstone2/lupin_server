import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '~/models/User';

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    classId!: string;

    @Column()
    openingTime!: string;

    @Column()
    closingTime!: string;

    @ManyToOne(() => User, (user) => user.lectures, { cascade: true })
    professor: User;

    @ManyToMany(() => User, (user) => user.courses, { cascade: true })
    students: User[];
}
