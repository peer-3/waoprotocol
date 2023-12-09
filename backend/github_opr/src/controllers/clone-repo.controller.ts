import clone from 'git-clone';
import pinataSDK from '@pinata/sdk';
// @ts-ignore
import zipDir from 'zip-dir';
import { DEFAULT_REPO_BRANCH } from '../defaults/repo/clone';
import { RepoCloneRequest, RepoCloneResponse } from 'src/types/github/repo.types';
import { ServerResponsePayload } from 'src/types/global/server';
import fs from 'fs';
import { Request, Response } from 'express';


export const repoCloneHandler = async (req: Request, res: Response) => {
    const body = req.body as RepoCloneRequest;
    const { repoUrl, branch, name, timestamp } = body;
    if (!repoUrl || !repoUrl.length || typeof repoUrl !== 'string') {
        const responsePayload: ServerResponsePayload<RepoCloneResponse> = {
            error: "Repo URL is required",
            message: 'Please provide a valid repo URL',
            status: 400
        }
        return res.status(400).json(responsePayload);
    }
    const currentPath = process.cwd();

    
    const repoName = repoUrl.split('/').pop()?.split('.')[0];
    // make folder if absent
    if (!fs.existsSync(`${currentPath}/data/clones`)) {
        fs.mkdirSync(`${currentPath}/data/clones`);
    }
    if (!fs.existsSync(`${currentPath}/data/clones/${repoName}`)) {
        fs.mkdirSync(`${currentPath}/data/clones/${repoName}`);
    }
    const repoPath = `${currentPath}/data/clones/${repoName}/${repoName}`;

    //creating new folder by repo name
    console.log(currentPath)

    clone(repoUrl, repoPath, {
        shallow: false,
        checkout: branch || DEFAULT_REPO_BRANCH
    }, async () => {
        console.log('Repo cloned successfully');
    })

    // zip dir
    await zipDir(`${currentPath}/data/clones/${repoName}/${repoName}`, { saveTo: `${currentPath}/data/clones/${repoName}/${repoName}.zip` });

    // uploading the zip file to web3 storage
    const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATAJWT });

    const stream = fs.createReadStream(`${currentPath}/data/clones/${repoName}/${repoName}.zip`);
    // console.log(stream)
    const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: {
            name: `${repoName}.zip`
        },
        pinataOptions: {
            cidVersion: 0
        },
    })

    // deleting the folder
    fs.rm(`${currentPath}/data/clones/${repoName}`, {
        recursive: true,
        force: true
    }, () => {
        console.log('Repo folder deleted successfully');
    });

    const responsePayload: ServerResponsePayload<RepoCloneResponse> = {
        data: {
            ipfsHash: result.IpfsHash,
            url: `https://ipfs.io/ipfs/${result.IpfsHash}`,
            in_time: timestamp,
            out_time: result.Timestamp,
            pin_size: result.PinSize,
            user_name: name
        },
        message: 'Repo cloned successfully',
        status: 200
    }
    return res.status(200).json(responsePayload);
}