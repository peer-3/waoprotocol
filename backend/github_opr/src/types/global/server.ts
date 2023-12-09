import 'zip-dir';

export interface ServerResponsePayload<T> {
    status: number;
    message: string;
    data?: T;
    error?: string;
}
