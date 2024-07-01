# EtapeDaily

## Overview

EtapeDaily is a Slack bot designed to enhance the Tour de France viewing experience by providing daily, non-spoiler updates on race stages. It posts brief summaries including stage number, starting and ending locations in a dedicated Slack channel. Each post is intended to serve as the start of a thread where detailed discussions and spoilers are encouraged, allowing fans to engage freely without spoiling the experience for others in the main channel.

## Features

- **Daily Updates**: Automated posts before each stage with essential information.
- **Thread-Based Discussions**: Initiates threads for in-depth discussions where spoilers are permitted.
- **Non-Spoiler Main Channel**: Keeps the main channel spoiler-free by centralizing detailed discussions in threads.

## Technology Stack

- **Node.js**: For backend logic.
- **AWS Lambda**: Hosts the bot's backend.
- **AWS EventBridge**: Manages scheduling for daily triggers.
- **Slack API**: Interfaces with Slack for posting and managing threads.

## Development, Deployment, and Usage

This project is developed using GitHub Codespaces, which allows for coding directly from a Chromebook. Deployment is managed through the AWS Cloud Development Kit (CDK), employing a declarative approach to infrastructure. Once deployed, EtapeDaily operates autonomously, posting scheduled updates that serve as conversation starters in the designated Slack channel.

## Data Fetching

This project uses the `procyclingstats` Python library to fetch daily updates about the Tour de France stages from ProCyclingStats.com. These details are stored in a JSON file (`data/tour_stages.json`) and updated daily via a scheduled AWS Lambda function triggered by Amazon EventBridge.

## Contributing

Contributions are welcome. Please submit pull requests for any enhancements.

## License

This project is licensed under the MIT License.
