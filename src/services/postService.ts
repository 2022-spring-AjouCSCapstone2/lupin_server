import { Comment, Post } from '~/models';
import { SavePostRequest } from '~/dto';
import {
    commentRepository,
    courseRepository,
    postRepository,
    userRepository,
} from '~/repositories';
import { NotFoundError } from '~/utils';
import { postType, userType } from '~/config';

export const getPostsByCourseId = (
    courseId: string,
    type?: string,
): Promise<Post[]> => {
    return postRepository.find({
        where: { course: { courseId }, type: postType[type] || postType.FREE },
        relations: ['user'],
    });
};

export const getPostByPostId = (postId: number): Promise<Post> => {
    return postRepository.findOne({
        where: { id: postId },
        relations: ['user', 'comments'],
    });
};

export const savePost = async (
    body: SavePostRequest,
    isNotice?: boolean,
): Promise<Post> => {
    const data = body.toEntity();

    const user = await userRepository.findOneBy({ userId: body.userId });

    data.user = user;
    data.course = await courseRepository.findOneBy({ courseId: body.courseId });

    if (isNotice && user.userType === userType.PROFESSOR) {
        data.type = postType.NOTICE;
    }

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
