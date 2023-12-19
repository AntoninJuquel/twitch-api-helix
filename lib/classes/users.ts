import { AxiosError } from "axios";
import {
  TwitchErrorResponseBody,
  TwitchUsersRequestParams,
  TwitchUsersResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Users {
  constructor() {}

  public async getUser(params: TwitchUsersRequestParams) {
    const response = await twitchAxios
      .get<TwitchUsersResponseBody>("/users", {
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
}
