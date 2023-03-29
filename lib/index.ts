import axios, { AxiosInstance } from "axios";

import {
  GenericTwitchResponse,
  TwitchClipRequestParams,
  TwitchGame,
  TwitchUser,
  TwitchClipResponseBody,
} from "./types";

import {
  ACCESS_TOKEN_ENDPOINT,
  API_PREFIX,
  VALIDATE_TOKEN_ENDPOINT,
} from "./globals";

export * from "./types";

export default class Twitch {
  private twitch: AxiosInstance;

  private clientId: string;

  private clientSecret: string;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.twitch = axios.create({
      baseURL: API_PREFIX,
      headers: {
        "Client-ID": this.clientId,
      },
    });
    this.twitch.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          await this.refreshToken();
          return this.twitch.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken() {
    const response = await axios.post(ACCESS_TOKEN_ENDPOINT, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });
    const { access_token: accessToken } = response.data;
    this.twitch.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  private async validateToken() {
    const response = await axios.get(VALIDATE_TOKEN_ENDPOINT, {
      headers: {
        Authorization: this.twitch.defaults.headers.Authorization,
      },
    });
    return response.data;
  }

  public get getClientId() {
    return this.clientId;
  }

  /**
   * Set the client ID for the Twitch API
   * @param clientId Client ID
   */
  public setClientId(clientId: string) {
    this.clientId = clientId;
    this.twitch.defaults.headers["Client-ID"] = clientId;
  }

  public get getClientSecret() {
    return this.clientSecret;
  }

  /**
   * Set the client secret for the Twitch API
   * @param clientSecret Client secret
   */
  public setClientSecret(clientSecret: string) {
    this.clientSecret = clientSecret;
  }

  /**
   * Generic GET request to the Twitch API
   * @doc https://dev.twitch.tv/docs/api/reference/
   * @param endpoint Endpoint to request
   * @param params Query parameters
   * @returns GenericTwitchResponse<T>
   */
  public async get<T>(
    endpoint: string,
    params: Record<string, string | number>
  ): Promise<GenericTwitchResponse<T>> {
    const response = await this.twitch.get<GenericTwitchResponse<T>>(endpoint, {
      params,
    });
    const { data } = response;
    return data;
  }

  public async getById<T>(endpoint: string, id: string): Promise<T> {
    const response = await this.get<T>(endpoint, { id });
    return response.data[0];
  }

  public async getGameByName(name: string): Promise<TwitchGame> {
    const response = await this.get<TwitchGame>("games", {
      name,
    });
    return response.data[0];
  }

  public async getUserByName(name: string): Promise<TwitchUser> {
    const response = await this.get<TwitchUser>("users", {
      login: name,
    });
    return response.data[0];
  }

  public async getClips(
    params: TwitchClipRequestParams
  ): Promise<TwitchClipResponseBody> {
    const response = await this.twitch.get<TwitchClipResponseBody>("clips", {
      params,
    });
    return response.data;
  }
}
