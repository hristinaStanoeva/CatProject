import express from 'express';
import bodyParser from 'body-parser';

import apiRoutes from './routes/api.routes';
import { NextFunction, Response, Request } from 'express';
import { OperationalError } from './util/errors';

const app = express();
app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('*', (req, res, next) => {
    return next(new OperationalError(404, 'Not Found'));
});

app.use(
    (
        err: OperationalError | Error,
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (err instanceof OperationalError) {
            return res
                .status(err.statusCode)
                .json({ message: err.errorMessage });
        }
        console.log(err);
        return res.status(500).json({ message: 'Server error' });
    }
);

export default app;
