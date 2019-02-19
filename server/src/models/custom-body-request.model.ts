import { Request } from 'express';

export interface CustomBodyRequest<K extends keyof any> extends Request {
    body: Partial<Record<K, string>>;
}
