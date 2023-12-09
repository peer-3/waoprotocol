export interface RepoCloneRequest {
    name: string;
    repoUrl: string;
    branch?: string;
    timestamp: string | number;
}

export interface RepoCloneResponse {
    ipfsHash: string;
    url: string;
    in_time: string | number;
    out_time: string | number;
    pin_size: string | number;
    user_name?: string;
}