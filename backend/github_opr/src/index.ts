import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import allRouters from './routes';
import { consumer } from './kafka/consumer';
import { Message } from 'kafka-node';
import { RepoCloneRequest } from './types/github/repo.types';
import { cloneRepoAndPushToIPFS } from './helpers/github/repo';
import http from 'http';
import { WSServer } from './web-sockets/init';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.get('/health', (_, res) => {
    res.send('OK');
})

app.use('/api', allRouters);

app.get('/kafka', (_req, res) => {
    consumer.on('message', (message: Message) => {
        const value = message.value;
        let body: RepoCloneRequest | null;
        if (typeof value !== 'string') {
            body = JSON.parse(value.toString());
        } else {
            body = JSON.parse(value);
        }
        if (body) {
            const { repoUrl, branch, name, timestamp } = body;
            cloneRepoAndPushToIPFS(repoUrl, branch, name, timestamp);
        }
        // console.log(message);    
    });
    consumer.on('error', (error) => {
        console.error(error);
    });
    res.send('Kafka consumer added to Express route!');
});

const server = http.createServer(app);

const wss = WSServer.getInstance(server).wss;

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    ws.send('Hello Client!');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});