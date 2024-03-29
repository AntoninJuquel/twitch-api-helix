import { AxiosError } from "axios";
import {
  TwitchClipsRequestParams,
  TwitchClipsResponseBody,
  TwitchErrorResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Clips {
  constructor() {}

  public async getClips(params: TwitchClipsRequestParams) {
    const response = await twitchAxios
      .get<TwitchClipsResponseBody>("/clips", {
        params,
      })
      .then((res) => {
        if (res.data.data.length === 0)
          throw new Error(
            `No clips found for ${JSON.stringify(params, null, 0)}`
          );
        return res.data;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });
    return response;
  }
}
