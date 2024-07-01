import dotenv from 'dotenv';
dotenv.config();

import { sendDirectMessage } from './lib/slackApi';

const mySlackId = process.env.MY_SLACK_ID;  // Your Slack user ID

async function startBot() {
    if (!mySlackId) {
        console.error("The Slack user ID is not set. Please check your .env file.");
        return; // Stop execution if the ID is not set
    }

    const message = 'Hello from EtapeDaily!';
    await sendDirectMessage(mySlackId, message);
}

startBot();
