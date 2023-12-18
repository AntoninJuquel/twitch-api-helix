import { AxiosError } from "axios";
import {
  TwitchErrorResponseBody,
  TwitchUserRequestParams,
  TwitchUserResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Users {
  constructor() {}

  public async getUser(params: TwitchUserRequestParams) {
    const response = await twitchAxios
      .get<TwitchUserResponseBody>("/users", {
        params,
      })
      .then((res) => {
        return res.data;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });
    return response;
  }

  public async getUserById(id: string) {
    return this.getUser({ id });
  }

  public async getUserByLogin(login: string) {
    return this.getUser({ login });
  }
}
