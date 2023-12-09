// web socket server singleton class

import { Server } from 'http';
import { WebSocketServer } from 'ws';

export class WSServer {
    private static instance: WSServer;
    // @ts-ignore
    private _server = {} as Server;
    private _wss = {} as WebSocketServer;

    private constructor(server: Server) {
        this._server = server;
        this._wss = new WebSocketServer({ server, path: '/ws' });
    }

    public static getInstance(server: Server | null): WSServer {
        if (!WSServer.instance && !server) {
            throw new Error('Server is required');
        }
        if (!WSServer.instance && server) {
            WSServer.instance = new WSServer(server);
        }
        return WSServer.instance;
    }

    get wss() {
        return this._wss;
    }
}