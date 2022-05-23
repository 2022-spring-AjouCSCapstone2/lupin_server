import { Post } from '~/models';

export class PostResponse {
    id!: number;

    title!: string;

    content!: string;

    createdAt!: Date;

    username!: string;

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.createdAt = post.createdAt;
        this.username = post.user.name;
    }
}
