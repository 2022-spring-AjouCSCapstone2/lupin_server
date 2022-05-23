import { Router } from 'express';
import { isLoggedIn, validationMiddleware } from '~/middlewares';
import { PostResponse, SavePostRequest } from '~/dto';
import * as postService from '~/services/postService';

const router = Router();

router.get('/courses/:courseId', (req, res, next) => {
    const { courseId } = req.params;

    postService
        .getPostsByCourseId(courseId)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.get('/:postId', (req, res, next) => {
    const { postId } = req.params;

    postService
        .getPostByPostId(Number(postId))
        .then((data) => {
            res.json(new PostResponse(data));
        })
        .catch(next);
});

router.post(
    '/',
    isLoggedIn,
    validationMiddleware(SavePostRequest),
    (req, res, next) => {
        const body: SavePostRequest = req.body;
        body.userId = req.user.userId;

        postService
            .savePost(body)
            .then((data) => {
                res.json(new PostResponse(data));
            })
            .catch(next);
    },
);

export default router;
