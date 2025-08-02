# Let's Go To Iceland

Main branch: ![Main workflow status](https://github.com/tiger-digital/letsgotoiceland/actions/workflows/node.js.yml/badge.svg?branch=main)

Develop branch: ![Develop workflow status](https://github.com/tiger-digital/letsgotoiceland/actions/workflows/node.js.yml/badge.svg?branch=develop)

## Installation

Open your terminal and in your working folder type

```bash
git clone git@github.com:tiger-digital/letsgotoiceland.git
```

Move inside the project folder and install the dependencies

```bash
cd letsgotoiceland
npm install
```

Create the .env file

```bash
cp .env.example .env
```

## Run the server

Run the NextJS project

```bash
npm run dev
```

Run the Prismic Slice Machine

```bash
npm run slicemachine
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

Open [http://localhost:9999](http://localhost:9999) with your browser to see the Slice Machine.

## Nav bar

If you make any change on the Prismic navbar, you will need to run the following command from the root of the project, in order to update the local JSON:

```bash
node scripts/fetchNavbarData.js
```

The script is automatically run when you start the `Dev` environment and when the project builds on `Production`

## TODO

Don't forget to remove the `no-index` when releasing the website
