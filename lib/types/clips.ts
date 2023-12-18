import { GenericTwitchResponse } from './client';

/**
 * https://dev.twitch.tv/docs/api/reference/#get-clips
 */
export type TwitchClipRequestParams = (
  | {
      broadcaster_id: string;
    }
  | {
      game_id: string;
    }
  | {
      id: string;
    }
) & {
  first?: number;
  started_at?: string;
  ended_at?: string;
  after?: string;
  before?: string;
};

export type TwitchClip = {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
  vod_offset: number;
};

/**
 * https://dev.twitch.tv/docs/api/reference/#get-clips
 */
export type TwitchClipResponseBody = GenericTwitchResponse<TwitchClip>;
