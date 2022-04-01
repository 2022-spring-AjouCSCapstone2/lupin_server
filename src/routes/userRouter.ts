import express from 'express';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn, validationMiddleware } from '~/middlewares';
import { JoinRequest, LoginRequest } from '~/dto';
import { join } from '~/services';

const router = express.Router();

router.post(
    '/login',
    isNotLoggedIn,
    validationMiddleware(LoginRequest),
    passport.authenticate('local'),
    (req, res, next) => {
        console.log(req.user, req.session);
        res.status(200).json(req.user);
    },
);

router.post('/join', validationMiddleware(JoinRequest), (req, res, next) => {
    const dto: JoinRequest = req.body;

    join(dto)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch(next);
});

router.get('/logout', isLoggedIn, (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.status(204).end();
    });
});

export default router;
