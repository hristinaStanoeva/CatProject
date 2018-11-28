import {
    Request,
    Response
} from 'express';

export interface CustomRequest extends Request {
    customData?: {
        [key: string]: boolean;
    };
}
