import { GenericTwitchResponse } from "./twitch";

/**
 * https://dev.twitch.tv/docs/api/reference/#get-games
 */
export type TwitchGamesRequestParams =
  | {
      id: string;
    }
  | {
      name: string;
    }
  | {
      igdb_id: string;
    };

export type TwitchGame = {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id?: number;
};

export type TwitchGamesResponseBody = GenericTwitchResponse<TwitchGame>;
