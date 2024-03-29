import { AxiosError } from "axios";
import {
  TwitchErrorResponseBody,
  TwitchGamesRequestParams,
  TwitchGamesResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Games {
  constructor() {}

  public async getTopGames() {
    const response = await twitchAxios
      .get<TwitchGamesResponseBody>("/games/top")
      .then((res) => {
        if (res.data.data.length === 0)
          throw new Error(
            `Top games request returned no data. This should not happen.`
          );
        return res.data;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });
    return response;
  }

  public async getGame(params: TwitchGamesRequestParams) {
    const response = await twitchAxios
      .get<TwitchGamesResponseBody>("/games", {
        params,
      })
      .then((res) => {
        if (res.data.data.length === 0)
          throw new Error(
            `No games found for ${JSON.stringify(params, null, 0)}`
          );
        return res.data;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });
    return response;
  }
}
