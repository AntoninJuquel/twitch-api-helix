import { GenericTwitchResponse } from "./client";

export type TwitchUserRequestParams =
  | {
      id: string;
    }
  | {
      login: string;
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

export type TwitchUserResponseBody = GenericTwitchResponse<TwitchUser>;
