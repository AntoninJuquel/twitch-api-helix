/**
 * https://dev.twitch.tv/docs/authentication/getting-tokens-oauth
 */
export type OAuth2Init = {
  clientId: string;
  clientSecret: string;
};

/**
 * https://dev.twitch.tv/docs/api/reference
 */
export type GenericTwitchResponse<T> = {
  data: T[];
  pagination?: {
    cursor: string;
  };
};

/**
 * https://dev.twitch.tv/docs/api/reference/#get-users
 */
export type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  email: string;
  created_at: string;
};

/**
 * https://dev.twitch.tv/docs/api/reference/#get-games
 */
export type TwitchGame = {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
};
