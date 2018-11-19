import express from 'express';

import { routes } from './routes';
import {
	NextFunction,
	Response,
	Request
} from 'express-serve-static-core';

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);
const port = 3000;

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
	console.log('hi!');
	return next();
})

app.listen(port, anounceOpenPort(port));
