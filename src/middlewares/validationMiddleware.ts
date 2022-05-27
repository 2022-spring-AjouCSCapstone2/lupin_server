import { RequestHandler } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HttpError, stringifyValidationErrors } from '~/utils';
import { BaseDto } from '~/dto/BaseDto';

type baseObj = {
    new (): BaseDto;
};

// baseObj: data transfer object (DTO) for passing data to service
// isBody: target is body (else, target is params)
export const validationMiddleware = (
    dto: baseObj,
    isBody = true,
): RequestHandler => {
    return (req, res, next) => {
        const obj = plainToInstance(dto, isBody ? req.body : req.params);

        return validate(obj)
            .then((errors) => {
                if (errors.length) {
                    return next(
                        new HttpError(400, stringifyValidationErrors(errors)),
                    );
                }
                if (isBody) {
                    req.body = obj;
                }
                next();
            })
            .catch(next);
    };
};
