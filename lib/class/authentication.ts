import axios, { AxiosError } from "axios";

import {
  OAuth2ValidateTokenResponseBody,
  OAuth2TokenResponseBody,
  TwitchErrorResponseBody,
} from "../types";

import {
  ACCESS_TOKEN_ENDPOINT,
  VALIDATE_TOKEN_ENDPOINT,
  twitchAxios,
} from "../globals";

export default class Authentication {
  constructor(private clientId: string, private clientSecret: string) {
    twitchAxios.defaults.headers["Client-ID"] = clientId;
    twitchAxios.interceptors.response.use(
      async (response) => response,
      async (error: AxiosError<TwitchErrorResponseBody>) => {
        if (error.response?.status === 401 && error.config) {
          const response = await this.refreshToken();
          error.config.headers.Authorization = `Bearer ${response.data.access_token}`;
          return twitchAxios.request(error.config);
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
        twitchAxios.defaults.headers.Authorization = `Bearer ${accessToken}`;
        return res;
      })
      .catch((err: AxiosError<TwitchErrorResponseBody>) => {
        throw new Error(err.response?.data?.message ?? err.message);
      });

    return response;
  }

  public async validateToken() {
    if (twitchAxios.defaults.headers.Authorization === undefined) {
      await this.refreshToken();
    }

    const response = await axios
      .get<OAuth2ValidateTokenResponseBody>(VALIDATE_TOKEN_ENDPOINT, {
        headers: {
          Authorization: twitchAxios.defaults.headers.Authorization,
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
    twitchAxios.defaults.headers["Client-ID"] = clientId;
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
  public async setClientIdClientSecret(clientId: string, clientSecret: string) {
    this.setClientId(clientId);
    this.setClientSecret(clientSecret);
    const response = await this.refreshToken();

    return response;
  }
}
