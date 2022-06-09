import { ValidatorOptions } from 'class-validator';

export abstract class BaseDto {
    options?: ValidatorOptions = {
        whitelist: true,
    };
}
