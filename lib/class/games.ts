import { AxiosError } from "axios";
import {
  TwitchErrorResponseBody,
  TwitchGameRequestParams,
  TwitchGameResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Games {
  constructor() {}

  public async getTopGames() {
    const response = await twitchAxios
      .get<TwitchGameResponseBody>("/games/top")
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

  public async getGame(params: TwitchGameRequestParams) {
    const response = await twitchAxios
      .get<TwitchGameResponseBody>("/games", {
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

  public async getGameById(id: string) {
    return this.getGame({ id });
  }

  public async getGameByName(name: string) {
    return this.getGame({ name });
  }

  public async getGameByIgdbId(igdb_id: string) {
    return this.getGame({ igdb_id });
  }
}
