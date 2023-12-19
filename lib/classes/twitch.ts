import { AxiosError } from "axios";

import { GenericTwitchResponse, TwitchErrorResponseBody } from "../types";
import { twitchAxios } from "../globals";

import Authentication from "./authentication";
import Games from "./games";
import Clips from "./clips";
import Users from "./users";

export default class Twitch {
  private _authentication: Authentication;

  private _games: Games;

  private _clips: Clips;

  private _users: Users;

  constructor(clientId: string, clientSecret: string) {
    this._authentication = new Authentication(clientId, clientSecret);
    this._games = new Games();
    this._clips = new Clips();
    this._users = new Users();
  }

  async init() {
    await this._authentication.refreshAccessToken();
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

  public get authentication() {
    return this._authentication;
  }

  public get games() {
    return this._games;
  }

  public get clips() {
    return this._clips;
  }

  public get users() {
    return this._users;
  }
}
