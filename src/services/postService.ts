import { Post } from '~/models';
import { postRepository } from '~/repositories/postRepository';

export const getPostsByCourseId = (courseId: string): Promise<Post[]> => {
    return postRepository.findBy({ course: { classId: courseId } });
};

export const getPostByPostId = (postId: number): Promise<Post> => {
    return postRepository.findOneBy({ id: postId });
};

export const savePost = (body): Promise<Post> => {
    const data = body.toEntity();

    return postRepository.save(data);
};
