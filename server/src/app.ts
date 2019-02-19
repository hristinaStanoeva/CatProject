import express from 'express';
import bodyParser from 'body-parser';

import apiRoutes from './routes/api.routes';

const app = express();

app.use(bodyParser.json());

app.use('/api', apiRoutes);
app.use('*', (req, res) => {
    return res.json(404);
});

export default app;
