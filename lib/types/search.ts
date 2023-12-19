import { GenericTwitchResponse } from "./twitch";

export type TwitchSearchChannelsRequestParams = {
  query: string;
  live_only?: boolean;
  first?: number;
  after?: string;
};

export type TwitchChannel = {
  broadcaster_language: string;
  broadcaster_login: string;
  display_name: string;
  game_id: string;
  game_name: string;
  id: string;
  is_live: boolean;
  tags_ids: string[];
  tags: string[];
  thumbnail_url: string;
  title: string;
  started_at: string;
};

export type TwitchSearchChannelsResponseBody =
  GenericTwitchResponse<TwitchChannel>;

export type TwitchSearchCategoriesRequestParams = {
  query: string;
  first?: number;
  after?: string;
};

export type TwitchCategory = {
  id: string;
  name: string;
  box_art_url: string;
};

export type TwitchSearchCategoriesResponseBody =
  GenericTwitchResponse<TwitchCategory>;
