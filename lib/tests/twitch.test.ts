import Twitch from "../classes/twitch";
import { TwitchGame } from "../types";

const twitch = new Twitch(
  process.env.TWITCH_CLIENT_ID as string,
  process.env.TWITCH_CLIENT_SECRET as string
);

describe("twitch", () => {
  test("should be defined", async () => {
    expect(twitch.authentication).toBeDefined();
    expect(twitch.games).toBeDefined();
    expect(twitch.clips).toBeDefined();
    expect(twitch.users).toBeDefined();
  });

  test("should get", async () => {
    const response = await twitch.get("/games", { name: "Destiny 2" });
    expect(response).toBeDefined();
    expect((response.data[0] as TwitchGame).name).toBe("Destiny 2");
  });

  test("should validate token", async () => {
    const response = await twitch.authentication.validateAccessToken();
    expect(response).toBeDefined();
    expect(response.data.expires_in).toBeDefined();
  });

  test("should get game", async () => {
    const response = await twitch.games.getGame({ name: "Destiny 2" });
    expect(response).toBeDefined();
    expect(response.data[0].name).toBe("Destiny 2");
  });

  test("should get clip", async () => {
    const response = await twitch.clips.getClips({
      broadcaster_id: "73013571",
    });
    expect(response).toBeDefined();
    expect(response.data[0].broadcaster_id).toBe("73013571");
  });

  test("should get user by id", async () => {
    const response = await twitch.users.getUser({ id: "73013571" });
    expect(response).toBeDefined();
    expect(response.data[0].id).toBe("73013571");
  });
});
