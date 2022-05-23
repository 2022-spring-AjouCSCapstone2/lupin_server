import { Post } from '~/models';
import { postRepository } from '~/repositories/postRepository';
import { SavePostRequest } from '~/dto';
import { courseRepository, userRepository } from '~/repositories';

export const getPostsByCourseId = (courseId: string): Promise<Post[]> => {
    return postRepository.find({
        where: { course: { courseId } },
        relations: ['user'],
    });
};

export const getPostByPostId = (postId: number): Promise<Post> => {
    return postRepository.findOne({
        where: { id: postId },
        relations: ['user'],
    });
};

export const savePost = async (body: SavePostRequest): Promise<Post> => {
    const data = body.toEntity();

    data.user = await userRepository.findOneBy({ userId: body.userId });
    data.course = await courseRepository.findOneBy({ courseId: body.courseId });

    return postRepository.save(data);
};
