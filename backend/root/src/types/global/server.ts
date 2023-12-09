import 'zip-dir';

export interface ServerResponsePayload<T> {
    status: number;
    message: string;
    data?: T;
    error?: string;
}

export interface ServerErrorResponsePayload {
    status: number;
    message: string;
    error: string;
}