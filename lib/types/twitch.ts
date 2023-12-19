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
 *
 */
export type TwitchErrorResponseBody = {
  status: number;
  message: string;
};
