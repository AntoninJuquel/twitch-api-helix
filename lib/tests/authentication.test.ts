import Authentication from "@/classes/authentication";

const authentication = new Authentication(
  process.env.TWITCH_CLIENT_ID as string,
  process.env.TWITCH_CLIENT_SECRET as string
);

describe("token", () => {
  test("should be defined", async () => {
    expect(authentication.getClientId).toBeDefined();
    expect(authentication.getClientSecret).toBeDefined();
  });

  test("should refresh token", async () => {
    const response = await authentication.refreshAccessToken();
    expect(response).toBeDefined();
  });

  test("should auto refresh token on validate", async () => {
    const response = await authentication.validateAccessToken();
    expect(response).toBeDefined();
  });

  test("should fail to refresh token", async () => {
    const localAuth = new Authentication("invalid", "invalid");
    await expect(localAuth.refreshAccessToken()).rejects.toThrow("invalid client");
  });

  test("should set credentials", async () => {
    const localAuth = new Authentication("invalid", "invalid");
    const response = await localAuth.setClientIdClientSecret(
      process.env.TWITCH_CLIENT_ID as string,
      process.env.TWITCH_CLIENT_SECRET as string
    );
    expect(response).toBeDefined();
  });
});
