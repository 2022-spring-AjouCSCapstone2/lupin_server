import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { dataSource } from '~/config/databaseConfig';
import { User } from '~/models';

export const passportConfig = () => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            async (email, password, done) => {
                try {
                    const user = await dataSource.manager.findOneBy(User, {
                        email,
                    });
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            password,
                            user.password,
                        );

                        if (isMatch) {
                            done(null, user);
                        } else {
                            done(null, false, {
                                message: 'Incorrect password',
                            });
                        }
                    } else {
                        done(null, false, { message: 'Incorrect email' });
                    }
                } catch (e) {
                    console.error(e);
                    done(e);
                }
            },
        ),
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user: any, done) => {
        try {
            const result = await dataSource.manager.findOneBy(User, {
                email: user.email,
            });

            done(null, result);
        } catch (e) {
            console.error(e);
            done(e);
        }
    });
};
