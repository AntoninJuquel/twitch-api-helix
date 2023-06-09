import axios, { AxiosError, AxiosInstance } from "axios";

import {
  GenericTwitchResponse,
  TwitchClipRequestParams,
  TwitchGame,
  TwitchUser,
  TwitchClip,
  OAuth2ValidateTokenResponseBody,
  OAuth2TokenResponseBody,
  TwitchErrorResponseBody,
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
      async (error: AxiosError<TwitchErrorResponseBody>) => {
        if (error.response?.status === 401 && error.config) {
          await this.refreshToken();
          return this.twitch.request(error.config);
        }
        throw new Error(error.response?.data?.message ?? error.message);
      }
    );
  }

  public async refreshToken() {
    const response = await axios
      .post<OAuth2TokenResponseBody>(ACCESS_TOKEN_ENDPOINT, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "client_credentials",
      })
      .then((res) => {
        const { access_token: accessToken } = res.data;
        this.twitch.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return res;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });

    return response;
  }

  public async validateToken() {
    if (this.twitch.defaults.headers.Authorization === undefined) {
      await this.refreshToken();
    }

    const response = await axios
      .get<OAuth2ValidateTokenResponseBody>(VALIDATE_TOKEN_ENDPOINT, {
        headers: {
          Authorization: this.twitch.defaults.headers.Authorization,
        },
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });

    return response;
  }

  public get getClientId() {
    return this.clientId;
  }

  public get getClientSecret() {
    return this.clientSecret;
  }

  /**
   * Set the client ID for the Twitch API
   * @param clientId Client ID
   */
  public setClientId(clientId: string) {
    this.clientId = clientId;
    this.twitch.defaults.headers["Client-ID"] = clientId;
  }

  /**
   * Set the client secret for the Twitch API
   * @param clientSecret Client secret
   */
  public setClientSecret(clientSecret: string) {
    this.clientSecret = clientSecret;
  }

  /**
   * Set the client ID and client secret for the Twitch API
   * @param clientId Client ID
   * @param clientSecret Client secret
   * @returns Promise<{ message: string }>
   * @throws Error if request failed
   * @throws Error if client ID or client secret is invalid
   * @throws Error if token refresh failed
   * @throws Error if token validation failed
   */
  public async setCredentials(clientId: string, clientSecret: string) {
    this.setClientId(clientId);
    this.setClientSecret(clientSecret);
    const response = await this.refreshToken();
    return response;
  }

  /**
   * Generic GET request to the Twitch API
   * @doc https://dev.twitch.tv/docs/api/reference/
   * @param endpoint Endpoint to request
   * @param params Query parameters
   * @returns GenericTwitchResponse<T>
   * @throws Error if request failed
   */
  public async get<T>(
    endpoint: string,
    params: Record<string, string | number>
  ): Promise<GenericTwitchResponse<T>> {
    const response = await this.twitch
      .get<GenericTwitchResponse<T>>(endpoint, {
        params,
      })
      .then((res) => {
        if (res.data.data.length === 0)
          throw new Error(
            `No data found for ${endpoint} with params 
            ${JSON.stringify(params, null, 2)}`
          );
        return res.data;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });
    return response;
  }

  public async getById<T>(endpoint: string, id: string): Promise<T[]> {
    const response = await this.get<T>(endpoint, { id });
    return response.data;
  }

  public async getGameByName(name: string): Promise<TwitchGame[]> {
    const response = await this.get<TwitchGame>("games", {
      name,
    });
    return response.data;
  }

  public async getUserByName(name: string): Promise<TwitchUser[]> {
    const response = await this.get<TwitchUser>("users", {
      login: name,
    });
    return response.data;
  }

  public async getClips(
    params: TwitchClipRequestParams
  ): Promise<GenericTwitchResponse<TwitchClip>> {
    const response = await this.get<TwitchClip>("clips", params);
    return response;
  }
}
