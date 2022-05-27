import { Router } from 'express';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn, validationMiddleware } from '~/middlewares';
import { JoinRequest, LoginRequest, UpdatePasswordRequest } from '~/dto';
import * as userService from '~/services';
import { uploaderMiddleware } from '~/middlewares/uploaderMiddleware';

const router = Router();

router.post(
    '/login',
    isNotLoggedIn,
    validationMiddleware(LoginRequest),
    passport.authenticate('local', { failureMessage: true }),
    (req, res, next) => {
        console.log(req.user, req.session);
        res.status(200).json(req.user);
    },
);

router.post('/join', validationMiddleware(JoinRequest), (req, res, next) => {
    const dto: JoinRequest = req.body;

    userService
        .join(dto)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.status(204).end();
    });
});

router.patch('/', isLoggedIn, (req, res, next) => {
    const { id } = req.user;
    const { phone } = req.body;

    userService
        .updateUser(id, phone)
        .then((data) => {
            res.json(data);
        })
        .catch(next);
});

router.patch(
    '/password',
    isLoggedIn,
    validationMiddleware(UpdatePasswordRequest),
    (req, res, next) => {
        const { id } = req.user;
        const { password, newPassword } = req.body;

        userService
            .updatePassword(id, password, newPassword)
            .then((data) => {
                res.json(data);
            })
            .catch(next);
    },
);

router.patch(
    '/image',
    isLoggedIn,
    uploaderMiddleware.single('image'),
    (req, res, next) => {
        const { id } = req.user;

        const { location } = req.file;

        userService
            .updateImagePath(id, location)
            .then((data) => {
                res.json(data);
            })
            .catch(next);
    },
);

export default router;
