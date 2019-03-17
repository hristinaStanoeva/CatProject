import { validationResult } from 'express-validator/check';
import { Location } from 'express-validator/check/location';
import { OperationalError } from '../util/errors';

interface ValidationResult {
    location: Location;
    param: string;
    msg: any;
    value: any;
}

export const runValidators = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        next();
    } else {
        const errors = validationResult<ValidationResult>(req)
            .array()
            .map(({ msg }) => msg);
        next(new OperationalError(400, errors));
    }
};
