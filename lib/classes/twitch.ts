import { AxiosError } from "axios";

import { GenericTwitchResponse, TwitchErrorResponseBody } from "@/types";
import { twitchAxios } from "@/globals";

import Authentication from "./authentication";
import Games from "./games";
import Clips from "./clips";
import Users from "./users";

export default class Twitch {
  private authentication: Authentication;

  private games: Games;

  private clips: Clips;

  private users: Users;

  constructor(clientId: string, clientSecret: string) {
    this.authentication = new Authentication(clientId, clientSecret);
    this.games = new Games();
    this.clips = new Clips();
    this.users = new Users();
  }

  /**
   * Generic GET request to the Twitch API
   * @doc https://dev.twitch.tv/docs/api/reference/
   * @param endpoint Endpoint to request
   * @param params Query parameters
   * @returns GenericTwitchResponse<T>
   * @throws Error if request failed
   */
  public async get<T>(
    endpoint: string,
    params: Record<string, string | number>
  ): Promise<GenericTwitchResponse<T>> {
    const response = await twitchAxios
      .get<GenericTwitchResponse<T>>(endpoint, {
        params,
      })
      .then((res) => {
        if (res.data.data.length === 0)
          throw new Error(
            `No data found for ${endpoint} with params 
                ${JSON.stringify(params, null, 2)}`
          );
        return res.data;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });
    return response;
  }

  public get authenticationClient() {
    return this.authentication;
  }

  public get gamesClient() {
    return this.games;
  }

  public get clipsClient() {
    return this.clips;
  }

  public get usersClient() {
    return this.users;
  }
}
