import { RepoCloneRequest } from "src/types/github/repo.types";
import { Request, Response } from "express";
import { KafkaProducer } from "../../kafka/init";
import { ServerErrorResponsePayload, ServerResponsePayload } from "src/types/global/server";

export const repoCloneHandler = async (req: Request, res: Response) => {
    const body = req.body as RepoCloneRequest;
    const { repoUrl, branch, name, timestamp } = body;
    if (!repoUrl || !repoUrl.length || typeof repoUrl !== 'string') {
        const responsePayload: ServerResponsePayload<ServerErrorResponsePayload> = {
            error: "Repo URL is required",
            message: 'Please provide a valid repo URL',
            status: 400
        }
        return res.status(400).json(responsePayload);
    }
    const kafkaInstance = KafkaProducer.getInstance();
    if (!kafkaInstance.isConnected) {
        await kafkaInstance.connect();
    }
    const producer = kafkaInstance.producer;
    const queueResponse = await producer.send({
        topic: 'github-repo-clone',
        messages: [
            {
                value: JSON.stringify({
                    repoUrl,
                    branch,
                    name,
                    timestamp
                })
            }
        ]
    });
    const responsePayload: ServerResponsePayload<Object> = {
        data: {
            queueResponse
        },
        message: 'Repo clone request queued',
        status: 200
    }
    return res.status(200).json(responsePayload);
}