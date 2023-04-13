/**
 * https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
 */
export type OAuth2AuthorizeRequestParams = {
  clientId: string;
  force_verify?: boolean;
  redirectUri: string;
  response_type: "token" | "code";
  scope: string[];
  state?: string;
};

/**
 * https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
 */
export type OAuth2AuthorizeResponseParams = {
  access_token?: string;
  scope?: string[];
  state?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

/**
 * https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
 */
export type OAuth2TokenRequestBody =
  | {
      grant_type: "client_credentials";
      client_id: string;
      client_secret: string;
    }
  | {
      grant_type: "authorization_code";
      client_id: string;
      client_secret: string;
      code: string;
      redirect_uri: string;
    }
  | {
      grant_type: "refresh_token";
      client_id: string;
      client_secret: string;
      refresh_token: string;
    };

/**
 * https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
 */
export type OAuth2TokenResponseBody = {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
  scope?: string[];
};

/**
 * https://dev.twitch.tv/docs/authentication/validate-tokens/
 */
export type OAuth2ValidateTokenResponseBody = {
  client_id: string;
  login: string;
  scopes: string[];
  user_id: string;
  expires_in: number;
};
