import { AxiosError } from "axios";
import {
  TwitchErrorResponseBody,
  TwitchStreamsRequestParams,
  TwitchStreamsResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Streams {
  constructor() {}

  public async getStreams(params: TwitchStreamsRequestParams) {
    const response = await twitchAxios
      .get<TwitchStreamsResponseBody>("/streams", {
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
