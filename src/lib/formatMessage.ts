// src/lib/formatMessage.ts
import { format, toZonedTime } from 'date-fns-tz';
import { Stage } from '../types';  // Assuming this is the correct path to your types file

export function formatStageMessage(stage: Stage) {
    if (stage.stageType === 'Rest Day') {
        return {
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: `Rest Day`,
                        emoji: true
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*📅 Date:* ${stage.date}`
                    }
                }
            ]
        };
    }

    const timeZone = 'America/Chicago';
    const zonedStartTime = toZonedTime(new Date(`${stage.date}T${stage.startTime}`), timeZone);
    const formattedStartTime = format(zonedStartTime, 'h:mm a zzzz', { timeZone });

    const stageNumber = typeof stage.stageNumber === 'number' ? stage.stageNumber : parseInt(stage.stageNumber);

    const distanceKm = stage.distance ?? 0;
    const verticalMeters = stage.verticalMeters ?? 0;
    const distanceMiles = (distanceKm * 0.621371).toFixed(1);  // Convert km to miles
    const verticalFeet = (verticalMeters * 3.28084).toFixed(0);  // Convert meters to feet

    return {
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: `🚴‍♂️ Stage ${stage.stageNumber}: ${stage.startLocation} to ${stage.endLocation}`,
                    emoji: true
                }
            },
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*📅 Date:* ${stage.date}`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*⏰ Start Time:* ${formattedStartTime}`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*📏 Distance:* ${distanceKm} km (${distanceMiles} miles)`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*⬆️ Vertical Meters:* ${verticalMeters} m (${verticalFeet} feet)`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*🚴‍♂️ Stage Type:* ${stage.stageType}`
                }
            },
            {
                type: "divider"
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*🧗 Climbs:*`
                }
            },
            ...(stage.climbs ?? []).map(climb => ({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `- ${climb}`
                }
            })),
            {
                type: "divider"
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "🔍 Start Location",
                            emoji: true
                        },
                        style: "primary",
                        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stage.startLocation ?? '')}`,
                        action_id: "start_location"
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "🔍 End Location",
                            emoji: true
                        },
                        style: "primary",
                        url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stage.endLocation ?? '')}`,
                        action_id: "end_location"
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "🌐 View on Le Tour",
                            emoji: true
                        },
                        style: "primary",
                        url: `https://www.letour.fr/en/stage-${stageNumber}`,
                        action_id: "view_on_letour"
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "🌐 View on ProCyclingStats",
                            emoji: true
                        },
                        style: "primary",
                        url: `https://www.procyclingstats.com/race/tour-de-france/2024/stage-${stageNumber}`,
                        action_id: "view_on_pcs"
                    }
                ]
            }
        ]
    };
}
