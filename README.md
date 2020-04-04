# Getting Started

## Clone the repo

```bash
git clone https://github.com/Neighbor-Army/help-with-covid
```

## Environment Variables

- Ask for an invitation to the `#engineering-data` channel in Slack and find the `.env` file.
- Check the `.env.example` file in the repo as reference
- Add your `.env` file to the root directory of the repo

## Installation

```bash
cd functions && yarn install
```

This will install the dependencies for both the front-end & backend.

## Run the Firebase Functions emulator

```bash
cd functions && yarn start
```

## Architecture

![Architecture 2](https://raw.githubusercontent.com/neighbor-army/help-with-covid/develop/docs/images/architecture-2.png)

![Architecture 1](https://raw.githubusercontent.com/neighbor-army/help-with-covid/develop/docs/images/architecture-1.png)
