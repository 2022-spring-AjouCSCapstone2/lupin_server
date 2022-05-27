import { Post, Comment } from '~/models';
import { SavePostRequest } from '~/dto';
import {
    courseRepository,
    userRepository,
    postRepository,
    commentRepository,
} from '~/repositories';
import { NotFoundError } from '~/utils';

export const getPostsByCourseId = (courseId: string): Promise<Post[]> => {
    return postRepository.find({
        where: { course: { courseId } },
        relations: ['user'],
    });
};

export const getPostByPostId = (postId: number): Promise<Post> => {
    return postRepository.findOne({
        where: { id: postId },
        relations: ['user', 'comments'],
    });
};

export const savePost = async (body: SavePostRequest): Promise<Post> => {
    const data = body.toEntity();

    data.user = await userRepository.findOneBy({ userId: body.userId });
    data.course = await courseRepository.findOneBy({ courseId: body.courseId });

    return postRepository.save(data);
};

export const saveComment = async (
    userId: number,
    content: string,
    postId: number,
): Promise<Comment> => {
    const post = await postRepository.findOneBy({ id: postId });
    const user = await userRepository.findOneBy({ id: userId });

    if (!post) {
        throw new NotFoundError('post not found');
    }

    const comment = new Comment();

    comment.user = user;
    comment.post = post;
    comment.content = content;

    return commentRepository.save(comment);
};
