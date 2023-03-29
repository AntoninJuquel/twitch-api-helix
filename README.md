# TWITCH API HELIX

[![npm version](https://badge.fury.io/js/twitch-api-helix.svg)](https://badge.fury.io/js/twitch-api-helix)
[![npm](https://img.shields.io/npm/dt/twitch-api-helix.svg)](https://www.npmjs.com/package/twitch-api-helix)

## Description

This is a simple module to interact with Twitch Helix API.

## Installation

```sh
npm install twitch-api-helix
```
```sh
yarn add twitch-api-helix
```
## Usage

```javascript
import TwitchApi from 'twitch-api-helix';

const twitch = new TwitchApi(CLIENT_ID, CLIENT_SECRET);

twitch.getGameByName("League of Legends").then((game) => {
  console.log(game);
});
```