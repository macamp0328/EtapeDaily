// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { formatStageMessage } from './lib/formatMessage';
import { sendDirectMessage } from './lib/slackApi';
import { Stage } from './types';

const mySlackId = process.env.MY_SLACK_ID;  // Your Slack user ID

async function startBot() {
    if (!mySlackId) {
        console.error("The Slack user ID is not set. Please check your .env file.");
        return; // Stop execution if the ID is not set
    }

    const dataPath = path.resolve(__dirname, '../data/tour_de_france_2024_details.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const tourData = JSON.parse(rawData);

    const today = new Date().toISOString().split('T')[0];  // Get today's date in YYYY-MM-DD format
    const stage = tourData.stages.find((s: Stage) => s.date === today) || tourData.stages[0];  // Fallback to the first stage if none match

    const message = formatStageMessage(stage);
    await sendDirectMessage(mySlackId, message);
}

startBot();
