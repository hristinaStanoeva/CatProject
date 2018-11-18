import {
    IncomingMessage,
    ServerResponse
} from 'http';

const GET = 'GET';
const POST = 'POST';

export const routes = (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/') {
        return res.end('Welcome home!');
    }

    if (req.url === '/users') {
        return res.end('["User1", "User2", "User3", "User4", "User5"]');
    }

    if (req.url === '/create-user' && req.method === POST) {
        let data = '';

        return req.on('data', (chunk) => {
            data += chunk.toString();
        }).on('end', () => {
            console.log(data.split('=')[1]);

            res.writeHead(302, {
                'Location': '/'
            });

            return res.end();
        })
    }

    res.writeHead(404, 'Not found');
    return res.end();
}
