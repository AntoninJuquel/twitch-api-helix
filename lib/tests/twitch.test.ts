import Twitch from "../index";

let twitch: Twitch;

describe("token", () => {
  beforeAll(async () => {
    twitch = new Twitch(
      process.env.TWITCH_CLIENT_ID as string,
      process.env.TWITCH_CLIENT_SECRET as string
    );
  });

  test("should be defined", async () => {
    expect(twitch.getClientId).toBeDefined();
    expect(twitch.getClientSecret).toBeDefined();
    expect(twitch).toBeDefined();
  });

  test("should refresh token", async () => {
    const response = await twitch.refreshToken();
    expect(response).toBeDefined();
  });

  test("should validate token", async () => {
    const response = await twitch.validateToken();
    expect(response).toBeDefined();
  });

  test("should fail to validate token", async () => {
    twitch = new Twitch("invalid", "invalid");
    await expect(twitch.validateToken()).rejects.toThrow(
      "No token to validate"
    );
  });

  test("should fail to refresh token", async () => {
    twitch = new Twitch("invalid", "invalid");
    await expect(twitch.refreshToken()).rejects.toThrow(
      "Request failed with status code 400"
    );
  });

  test("should set credentials", async () => {
    twitch = new Twitch("invalid", "invalid");
    const response = await twitch.setCredentials(
      process.env.TWITCH_CLIENT_ID as string,
      process.env.TWITCH_CLIENT_SECRET as string
    );
    expect(response).toBeDefined();
  });
});

describe("user", () => {
  beforeAll(async () => {
    twitch = new Twitch(
      process.env.TWITCH_CLIENT_ID as string,
      process.env.TWITCH_CLIENT_SECRET as string
    );
  });

  test("should get an user by name", async () => {
    const user = await twitch.getUserByName("Sardoche");
    expect(user).toBeDefined();
  });

  test("should get an user by id", async () => {
    const user = await twitch.getById("users", "44322889");
    expect(user).toBeDefined();
  });

  test("should fail to get an user by id", async () => {
    await expect(twitch.getById("users", "-1")).rejects.toThrow(
      "Request failed with status code 400"
    );
  });
});

describe("game", () => {
  beforeAll(async () => {
    twitch = new Twitch(
      process.env.TWITCH_CLIENT_ID as string,
      process.env.TWITCH_CLIENT_SECRET as string
    );
  });

  test("should get a game by name", async () => {
    const game = await twitch.getGameByName("League of Legends");
    expect(game).toBeDefined();
  });

  test("should get a game by id", async () => {
    const game = await twitch.getById("games", "21779");
    expect(game).toBeDefined();
  });

  test("should fail to get an game by id", async () => {
    await expect(twitch.getById("games", "-1")).rejects.toThrow();
  });
});

describe("clips", () => {
  beforeAll(async () => {
    twitch = new Twitch(
      process.env.TWITCH_CLIENT_ID as string,
      process.env.TWITCH_CLIENT_SECRET as string
    );
  });

  test("should get a clip by id", async () => {
    const clip = await twitch.getById(
      "clips",
      "BlindingBlatantScorpionFreakinStinkin-9xh8qqYbbBxmQmGr"
    );
    expect(clip).toBeDefined();
  });

  test("should fail to get a clip by id", async () => {
    await expect(twitch.getById("clips", "-1")).rejects.toThrow();
  });

  test("should get clips by game id", async () => {
    const clips = await twitch.getClips({
      game_id: "21779",
      first: 10,
    });
    expect(clips).toBeDefined();
  });
});
