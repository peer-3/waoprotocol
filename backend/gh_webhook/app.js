import dotenv from "dotenv";
import { App } from "octokit";
import { createNodeMiddleware } from "@octokit/webhooks";
import fs from "fs";
import http from "http";
import axios from "axios";

dotenv.config();

const appId = process.env.APP_ID;
const webhookSecret = process.env.WEBHOOK_SECRET;
const privateKeyPath = process.env.PRIVATE_KEY_PATH;

const privateKey = fs.readFileSync(privateKeyPath, "utf8");

const app = new App({
    appId: appId,
    privateKey: privateKey,
    webhooks: {
        secret: webhookSecret,
    },
});

const messageForNewPRs =
    "Thanks for opening a new PR! Please follow our contributing guidelines to make your PR easier to review.";

async function handlePullRequestClosed({ octokit, payload }) {
    console.log(`Received a pull request event for #${JSON.stringify(payload)}`);
    const urlarray = payload.pull_request.html_url.split("/");
    let url = "";
    for (let i = 0; i < urlarray.length - 2; i++) {
        url += urlarray[i];
        if (i == urlarray.length - 3) break;
        url += "/";
    }
    console.log(url);
    const { data } = await axios.post(
        {
            repoUrl: url,
            name: urlarray[2],
            branch: "main",
        }
    );
    try {
        await octokit.request(
            "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
            {
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                issue_number: payload.pull_request.number,
                body: messageForNewPRs + JSON.stringify(data),
                headers: {
                    "x-github-api-version": "2022-11-28",
                },
            }
        );
    } catch (error) {
        if (error.response) {
            console.error(
                `Error! Status: ${error.response.status}. Message: ${error.response.data.message}`
            );
        }
        console.error(error);
    }
}

app.webhooks.on("pull_request.closed", handlePullRequestClosed);

app.webhooks.onError((error) => {
    if (error.name === "AggregateError") {
        console.error(`Error processing request: ${error.event}`);
    } else {
        console.error(error);
    }
});

const port = 5003;
const host = "localhost";
const path = "/api/webhook";

const middleware = createNodeMiddleware(app.webhooks, { path });

const localWebhookUrl = `http://${host}:${port}${path}`;

http.createServer(middleware).listen(port, () => {
    console.log(`Server is listening for events at: ${localWebhookUrl}`);
    console.log("Press Ctrl + C to quit.");
});
