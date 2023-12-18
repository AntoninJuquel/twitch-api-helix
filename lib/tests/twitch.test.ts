import Twitch from "../class";
import { TwitchGame } from "../types";

const twitch = new Twitch(
  process.env.TWITCH_CLIENT_ID as string,
  process.env.TWITCH_CLIENT_SECRET as string
);

describe("twitch", () => {
  test("should be defined", async () => {
    expect(twitch.authenticationClient).toBeDefined();
    expect(twitch.gamesClient).toBeDefined();
    expect(twitch.clipsClient).toBeDefined();
    expect(twitch.usersClient).toBeDefined();
  });

  test("should get", async () => {
    const response = await twitch.get("/games", { name: "Destiny 2" });
    expect(response).toBeDefined();
    expect((response.data[0] as TwitchGame).name).toBe("Destiny 2");
  });

  test("should validate token", async () => {
    const response = await twitch.authenticationClient.validateToken();
    expect(response).toBeDefined();
    expect(response.data.expires_in).toBeDefined();
  });

  test("should get game", async () => {
    const response = await twitch.gamesClient.getGame({ name: "Destiny 2" });
    expect(response).toBeDefined();
    expect(response.data[0].name).toBe("Destiny 2");
  });

  test("should get clip", async () => {
    const response = await twitch.clipsClient.getClips({
      broadcaster_id: "73013571",
    });
    expect(response).toBeDefined();
    expect(response.data[0].broadcaster_id).toBe("73013571");
  });

  test("should get user by id", async () => {
    const response = await twitch.usersClient.getUserById("73013571");
    expect(response).toBeDefined();
    expect(response.data[0].id).toBe("73013571");
  });
});
