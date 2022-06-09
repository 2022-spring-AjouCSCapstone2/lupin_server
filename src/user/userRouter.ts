import { Router } from 'express';
import passport from 'passport';
import {
    isLoggedIn,
    isNotLoggedIn,
    validationMiddleware,
    uploaderMiddleware,
} from '~/middlewares';
import {
    JoinRequest,
    LoginRequest,
    UpdatePasswordRequest,
    UpdateUserRequest,
    UserResponse,
} from './dto';
import * as userService from './userService';

const userRouter = Router();

userRouter.post(
    '/login',
    isNotLoggedIn,
    validationMiddleware(LoginRequest),
    passport.authenticate('local', { failureMessage: true }),
    (req, res, next) => {
        res.status(200).json(new UserResponse(req.user));
    },
);

userRouter.post(
    '/join',
    validationMiddleware(JoinRequest),
    (req, res, next) => {
        const dto: JoinRequest = req.body;

        userService
            .join(dto)
            .then((data) => {
                res.status(201).json(new UserResponse(data));
            })
            .catch(next);
    },
);

userRouter.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.status(204).end();
    });
});

userRouter.patch(
    '/',
    isLoggedIn,
    validationMiddleware(UpdateUserRequest),
    (req, res, next) => {
        const { id } = req.user;
        const { phone } = req.body;

        userService
            .updateUser(id, phone)
            .then((data) => {
                res.json(new UserResponse(data));
            })
            .catch(next);
    },
);

userRouter.patch(
    '/password',
    isLoggedIn,
    validationMiddleware(UpdatePasswordRequest),
    (req, res, next) => {
        const { id } = req.user;
        const { password, newPassword } = req.body;

        userService
            .updatePassword(id, password, newPassword)
            .then((data) => {
                res.json(new UserResponse(data));
            })
            .catch(next);
    },
);

userRouter.patch(
    '/image',
    isLoggedIn,
    uploaderMiddleware.single('image'),
    (req, res, next) => {
        const { id } = req.user;

        const { location } = req.file;

        userService
            .updateImagePath(id, location)
            .then((data) => {
                res.json(new UserResponse(data));
            })
            .catch(next);
    },
);

export default userRouter;
