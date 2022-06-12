import { Comment, Post, User } from '~/models';

export class CommentResponse {
    id!: number;

    content!: string;

    post: Post;

    user: User;

    constructor(comment: Comment) {
        this.id = comment.id;
        this.content = comment.content;
        this.post = comment.post;
        this.user = comment.user;
    }
}
