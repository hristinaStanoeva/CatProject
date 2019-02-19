import { validationResult } from 'express-validator/check';
import { Location } from 'express-validator/check/location';

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
            .map(({ msg, param }) => ({ field: param, error: msg }));
        return res.status(400).json(errors);
    }
};
