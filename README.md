# Getting Started

## Clone the repo

```bash
git clone https://github.com/Neighbor-Army/help-with-covid
```

## Environment Variables

Ask for an invitation to the `#engineering-data` channel in Slack and find the `.env` file. Copy it at the root of the help-with-covid directory.

## Start the Frontend Server

Install it and run the server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

## Start the Backend Server

The backend is broken up into two parts. There is the firebase functions which are serverless functions that allow us to deploy our own APIs. Then there's Onfleet which is our task handling system.

### Firebase Functions

Install the firebase tools globally with:

```bash
npm install -g firebase-tools
```

### Start the Backend Server

```bash
firebase emulators:start
```
