import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import apiRoutes from './routes';

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.get('/health', (_, res) => {
    res.send('OK');
})

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});