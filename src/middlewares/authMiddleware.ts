export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export const isStudent = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userType === 'student') {
        return next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export const isProfessor = (req, res, next) => {
    if (req.isAuthenticated() && req.user.userType === 'professor') {
        return next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};
