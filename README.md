# TWITCH API HELIX

[![npm version](https://badge.fury.io/js/twitch-api-helix.svg)](https://badge.fury.io/js/twitch-api-helix)
[![npm](https://img.shields.io/npm/dt/twitch-api-helix.svg)](https://www.npmjs.com/package/twitch-api-helix)

This is a simple module to interact with Twitch Helix API. Fully written in TypeScript.

## Installation

```sh
npm install twitch-api-helix
```

```sh
yarn add twitch-api-helix
```

Then you **must** [Register your Twitch application](https://dev.twitch.tv/docs/api/get-started/#register-an-application) to get your `CLIENT_ID` and `CLIENT_SECRET`, the package will take care of the OAuth2 process.

You will just need to provide the `CLIENT_ID` and `CLIENT_SECRET` to the constructor, feel free to store them in a `.env` file.

Feeld free to check the [Twitch Helix API Reference](https://dev.twitch.tv/docs/api/reference) for more information.

## Usage

```js
import TwitchApi from "twitch-api-helix";

const twitchApi = new TwitchApi(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);
```

## API

### [Authentication](https://github.com/AntoninJuquel/twitch-api-helix/blob/master/lib/classes/authentication.ts)

#### refreshAccessToken()

Refresh the access token, you can call this method manually but it will be called automatically when a request is made and the access token is expired.

```js
twitchApi.authentication.refreshAccessToken();
```

#### validateAccessToken()

Validate the access token, if it is valid nothing will happen, if it is not valid it will be refreshed.

```js
twitchApi.authentication.validateAccessToken();
```

### [Clips](https://github.com/AntoninJuquel/twitch-api-helix/blob/master/lib/classes/clips.ts)

#### getClips(TwitchClipsRequestParams) => TwitchClipsResponseBody

```ts
type TwitchClipsRequestParams = (
  | {
      broadcaster_id: string;
    }
  | {
      game_id: string;
    }
  | {
      id: string;
    }
) & {
  first?: number;
  started_at?: string;
  ended_at?: string;
  after?: string;
  before?: string;
};
```

```ts
type TwitchClipsResponseBody = {
  data: TwitchClip[];
  pagination?:
    | {
        cursor: string;
      }
    | undefined;
};
```

```ts
type TwitchClip = {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
  vod_offset: number;
};
```

Get clips by ID.

```js
twitchApi.clips.getClips({
  id: "123456789",
});
```

Get clips by broadcaster ID

```js
twitchApi.clips.getClips({
  broadcaster_id: "123456789",
  first: 10,
});
```

Get clips by game ID

```js
twitchApi.clips.getClips({
  game_id: "123456789",
  first: 10,
});
```

### [Games](https://github.com/AntoninJuquel/twitch-api-helix/blob/master/lib/classes/games.ts)

#### getGame(TwitchGamesRequestParams) => TwitchGamesResponseBody

```ts
type TwitchGamesRequestParams =
  | {
      id: string;
    }
  | {
      name: string;
    }
  | {
      igdb_id: string;
    };
```

```ts
type TwitchGamesResponseBody = {
  data: TwitchGame[];
  pagination?:
    | {
        cursor: string;
      }
    | undefined;
};
```

```ts
type TwitchGame = {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id?: number;
};
```

Get games by ID.

```js
twitchApi.games.getGame({
  id: "123456789",
});
```

Get games by name.

```js
twitchApi.games.getGame({
  name: "Fortnite",
});
```

Get games by IGDB ID.

```js
twitchApi.games.getGame({
  igdb_id: "123456789",
});
```

### [Users](https://github.com/AntoninJuquel/twitch-api-helix/blob/master/lib/classes/users.ts)

#### getUser(TwitchUsersRequestParams) => TwitchUsersResponseBody

```ts
type TwitchUsersRequestParams =
  | {
      id: string;
    }
  | {
      login: string;
    };
```

```ts
type TwitchUsersResponseBody = {
  data: TwitchUser[];
  pagination?:
    | {
        cursor: string;
      }
    | undefined;
};
```

```ts
type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  email: string;
  created_at: string;
};
```

Get users by ID.

```js
twitchApi.users.getUser({
  id: "123456789",
});
```

Get users by login.

```js
twitchApi.users.getUser({
  login: "Somindras",
});
```
