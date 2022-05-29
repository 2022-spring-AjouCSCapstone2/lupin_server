import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '~/models/Course';
import { User } from '~/models/User';
import { Comment } from '~/models/Comment';
import { postType } from '~/config';

@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'enum', enum: postType, default: postType.FREE })
    type!: postType;

    @Column({ nullable: false })
    title!: string;

    @Column({ nullable: false })
    content!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @ManyToOne(() => Course, (course) => course.posts, { cascade: true })
    course!: Course;

    @ManyToOne(() => User, (user) => user.posts, { cascade: true })
    user!: User;

    @OneToMany(() => Comment, (comment) => comment.post, {
        onDelete: 'CASCADE',
    })
    comments!: Comment[];
}
