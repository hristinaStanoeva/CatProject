import {
    default as http,
    IncomingMessage,
    ServerResponse
} from 'http';
import { routes } from './routes';

const anounceOpenPort = (port: number) => () => console.log(`Listening on port ${port}`);

const port = 3000;

const server = http.createServer(routes);
server.listen(port, anounceOpenPort(port));
