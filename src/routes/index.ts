import express from 'express';

import userRouter from './userRouter';
import courseRouter from './courseRouter';

const router = express.Router();

router.use('/users', userRouter);
router.use('/courses', courseRouter);

export default router;
