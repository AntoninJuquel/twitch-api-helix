import axios from "axios";

export const API_PREFIX = "https://api.twitch.tv/helix";
export const OAUTH2_PREFIX = "https://id.twitch.tv/oauth2";
export const AUTHORIZATION_ENDPOINT = `${OAUTH2_PREFIX}/authorize`;
export const ACCESS_TOKEN_ENDPOINT = `${OAUTH2_PREFIX}/token`;
export const VALIDATE_TOKEN_ENDPOINT = `${OAUTH2_PREFIX}/validate`;

export const twitchAxios = axios.create({
  baseURL: API_PREFIX,
  headers: {
    "Client-ID": process?.env?.TWITCH_CLIENT_ID || "",
    Authorization: `Bearer ${process?.env?.TWITCH_ACCESS_TOKEN || ""}`,
  },
});
