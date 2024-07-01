// src/lib/slackApi.ts

import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_BOT_TOKEN;  // Slack Bot OAuth token
const webClient = new WebClient(token);

export async function sendDirectMessage(userId: string, message: string) {
    try {
        const response = await webClient.chat.postMessage({
            channel: userId,
            text: message
        });
        console.log('Message sent successfully:', response.ts);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
