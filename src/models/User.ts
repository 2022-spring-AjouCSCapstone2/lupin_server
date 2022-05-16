import bcrypt from 'bcrypt';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { userType } from '~/config';
import { Course } from '~/models/Course';
import { Post } from '~/models/Post';

@Entity({ name: 'users' })
export class User {
    // PK
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    // 학번
    @Column({ unsigned: true, unique: true })
    userId!: number;

    // 이름
    @Column({ nullable: false })
    name!: string;

    // 유저 분류
    @Column({ type: 'enum', enum: userType, default: userType.STUDENT })
    userType!: userType;

    @Column({ nullable: false, unique: true })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ default: null })
    phone!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @JoinTable({
        name: 'courses_users',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
        },
    })
    @ManyToMany(() => Course, (course) => course.students)
    courses!: Course[];

    @OneToMany(() => Course, (course) => course.professor, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    lectures!: Course[];

    @OneToMany(() => Post, (post) => post.user, { onDelete: 'CASCADE' })
    posts!: Post[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 5);
    }

    static of(userId: number): User {
        const user = new User();
        user.userId = userId;

        return user;
    }
}
