import { WebClient } from '@slack/web-api';

const token = process.env.SLACK_BOT_TOKEN;

const webClient = new WebClient(token);

export async function sendDirectMessage(userId: string, message: any) {
    try {
        const response = await webClient.chat.postMessage({
            channel: userId,
            text: 'Tour de France Stage Preview',  // Required for Slack API, but blocks will override it
            blocks: message.blocks
        });
        console.log('Message sent successfully:', response.ts);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
