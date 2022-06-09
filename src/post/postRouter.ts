import { Request, Router } from 'express';
import { isLoggedIn, validationMiddleware } from '~/middlewares';
import {
    GetPostQuery,
    PostResponse,
    SaveCommentRequest,
    SavePostRequest,
} from '~/dto';
import * as postService from './postService';

const router = Router();

router.get(
    '/courses/:courseId',
    // eslint-disable-next-line @typescript-eslint/ban-types
    (req: Request<{ courseId: string }, {}, {}, GetPostQuery>, res, next) => {
        const { courseId } = req.params;

        const { postType } = req.query;

        postService
            .getPostsByCourseId(courseId, postType)
            .then((data) => {
                res.json(data);
            })
            .catch(next);
    },
);

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

router.post(
    '/notices',
    isLoggedIn,
    validationMiddleware(SavePostRequest),
    (req, res, next) => {
        const body: SavePostRequest = req.body;
        body.userId = req.user.userId;

        postService
            .savePost(body, true)
            .then((data) => {
                res.json(new PostResponse(data));
            })
            .catch(next);
    },
);

router.post(
    '/comments',
    isLoggedIn,
    validationMiddleware(SaveCommentRequest),
    (req, res, next) => {
        const { postId, content } = req.body;
        const userId = req.user.id;

        postService
            .saveComment(userId, content, postId)
            .then((data) => {
                res.json(data);
            })
            .catch(next);
    },
);

export default router;
