import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '~/models/Post';

@Entity({ name: 'comments' })
export class Comment {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column()
    content!: string;

    @ManyToOne(() => Post, (post) => post.comments, { cascade: true })
    post!: Post;
}
