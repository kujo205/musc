# Musc

## About

The purpose of this service is to make up for limitations of YT music platform. It must be a dead simple tool to allow you to share and manage your youtube music playlists

## Why

I am a big fan of music as many of us are. There are loads of music service providers, one of which is Youtube music. It is a great music listening platform, every music item I have I store there. However it comes with some limitations.

## How to run and test the project

Install with

```bash
git clone <utl-to-this-repo>
```

cd to a projects root directory

```sh
cd <path-to-musc-repo>
```

Install dependencies

```sh
npm i
```

To run unit tests hit

```sh
npm run test:unit
```

To run integration tests hit

```sh
npm run test:i
```

To run e2e tests hit

```sh
npm run test:e2e
```

You can also run all the tests at once, but it is not reccomended

```sh
npm run test
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

Deployment links
[Development environment](https://dev-musc.space-crammers.earth/)

[Production environment](https://musc.space-crammers.earth/)

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
