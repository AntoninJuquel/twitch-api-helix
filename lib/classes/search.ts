import { AxiosError } from "axios";
import {
  TwitchErrorResponseBody,
  TwitchSearchCategoriesRequestParams,
  TwitchSearchCategoriesResponseBody,
  TwitchSearchChannelsRequestParams,
  TwitchSearchChannelsResponseBody,
} from "../types";
import { twitchAxios } from "../globals";

export default class Search {
  constructor() {}

  public async searchCategories(params: TwitchSearchCategoriesRequestParams) {
    const response = await twitchAxios
      .get<TwitchSearchCategoriesResponseBody>("/search/categories", {
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

  public async searchChannels(params: TwitchSearchChannelsRequestParams) {
    const response = await twitchAxios
      .get<TwitchSearchChannelsResponseBody>("/search/channels", {
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
