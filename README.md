# Getting Started

## Clone the repo

```bash
git clone https://github.com/Neighbor-Army/help-with-covid
```

## Environment Variables

-   Ask for an invitation to the `#engineering-data` channel in Slack and find the `.env` file.
-   Check the `.env.example` file in the repo as reference
-   Add your `.env` file to the root directory of the repo

## Installation

```bash
yarn install
```

This will install the dependencies for both the front-end & backend.

## Run the Servers

```bash
yarn install && yarn dev:all
```

`yarn dev:all` will start both the front-end & back-end server.

### Start only Frontend Server

`yarn dev` will start just the frontend server

### Start the Backend Server

The backend is broken up into two parts. There is the firebase functions which are serverless functions that allow us to deploy our own APIs. Then there's OnFleet which is our task handling system.

`cd functions && yarn serve` will start just the backend server.
