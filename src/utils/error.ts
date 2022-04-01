import { ValidationError } from 'class-validator';

export class HttpError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(400, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string) {
        super(401, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string) {
        super(403, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(404, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string) {
        super(409, message);
    }
}

const combineErrors = (errors?: ValidationError[]): Record<string, unknown> => {
    if (!errors) {
        return {};
    }
    return errors.reduce<Record<string, unknown>>((acc, curr) => {
        acc[curr.property] = curr.constraints || combineErrors(curr.children);
        return acc;
    }, {});
};

export const stringifyValidationErrors = (
    errors: ValidationError[],
): string => {
    return JSON.stringify(combineErrors(errors));
};
