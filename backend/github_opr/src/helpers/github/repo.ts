// import clone from 'git-clone';
import pinataSDK from '@pinata/sdk';
// @ts-ignore
// import zipDir from 'zip-dir';
import { DEFAULT_REPO_BRANCH } from '../../defaults/repo/clone';
import fs from 'fs';
import { WSServer } from '../../web-sockets/init';
import { exec } from 'child_process';
import { ethers } from 'ethers';
import abi from '../../../contracts/snapshots/abi.json';
import { uploadResponse } from './lighthouse';

export const cloneRepoAndPushToIPFS = async (repoUrl: string, branch: string | undefined, name: string, timestamp: string | number) => {
    try {
        const wss = WSServer.getInstance(null).wss;
        if (!repoUrl || !repoUrl.length || typeof repoUrl !== 'string') {
            throw new Error('Repo URL is required');
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

        const cloneRepoLink = repoUrl + `/archive/refs/heads/${branch || DEFAULT_REPO_BRANCH}.zip`;
        console.log(cloneRepoLink);

        // clone repo
        await cloneRepoAsync(cloneRepoLink, repoPath);
        console.log('Repo cloned successfully')
        //clone repo to path using curl

        const dealParams = {
            num_copies: 2,
            repair_threshold: 28800,
            renew_threshold: 240,
            miner: ["t017840"],
            network: 'calibration',
            add_mock_data: 2
        };

        const uResponse = await uploadResponse(`${currentPath}/data/clones/${repoName}/${repoName}.zip`, dealParams)
        console.log(uResponse)

        // clone(repoUrl, repoPath, {
        //     checkout: branch || DEFAULT_REPO_BRANCH
        // }, async () => {
        //     console.log('Repo cloned successfully');
        // })

        // clg repo files
        console.log(fs.readdirSync(`${currentPath}/data/clones/${repoName}`));

        // zip dir
        // await zipDir(`${currentPath}/data/clones/${repoName}/${repoName}`, { saveTo: `${currentPath}/data/clones/${repoName}/${repoName}.zip` });

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
            console.log('Folder deleted successfully');
        })
        const ipfsHash = result.IpfsHash;
        const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
        const ipfsUrl2 = `https://cloudflare-ipfs.com/ipfs/${ipfsHash}`
        console.log(ipfsUrl);
        const clientMessage = {
            repoUrl,
            branch,
            name,
            inTime: timestamp,
            ipfsUrl,
            ipfsUrl2,
            outTime: result.Timestamp,
            size: result.PinSize,
            lightHouse: uResponse
        }
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(clientMessage));
        });

        const address = '0x85bEB9F4BCFB0dc0352642aF9E308a4cD6a85775';
        const repo_name = repoName;
        const commit_hash = 'dfdks';
        const html_url = ipfsUrl;
        const description = ipfsUrl2;
        const is_private = false;
        const forks_count = 10;
        const watchers_count = 10;
        const size = result.PinSize;
        const has_issues = false;
        const branches = '10';

        const alchemyProvider = new ethers.providers.AlchemyProvider('polygon', process.env.API_KEY);
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY || '', alchemyProvider);
        const snapshotContract = new ethers.Contract('0x55e8D3d2AD500b2620D8f8f2134d79021d0a15a9', abi, signer);
        // await snapshotContract.createSnapshot('0x85bEB9F4BCFB0dc0352642aF9E308a4cD6a85775', repoName, 'dfdks', ipfsUrl, ipfsUrl2, false, 10, result.PinSize, timestamp, "10", "11");
        await snapshotContract.createSnapshot(address, repo_name, commit_hash, html_url, description, is_private, forks_count, watchers_count, size, has_issues, branches);
        return clientMessage;
    } catch (error) {
        console.log("Error in cloning repo")
        console.error(error);
        return null;
    }
}

async function cloneRepoAsync(cloneRepoLink: string, repoPath: string): Promise<void> {
    const cmd = `curl -L ${cloneRepoLink} -o ${repoPath}.zip`;

    try {
        const { stdout, stderr } = await new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
            exec(cmd, (err, stdout, stderr) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });

        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    } catch (error) {
        console.error('Error:', error);
    }
}