import express from 'express';

import userRouter from './userRouter';
import courseRouter from './courseRouter';
import postRouter from './postRouter';

const router = express.Router();

router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/posts', postRouter);

export default router;
