import { Response } from 'express';

export interface CustomLocalsResponse<T> extends Response {
    locals: Partial<{ [P in keyof T]: T[P] }>;
}
