import Users from "../class/users";
import { twitchAxios } from "../globals";

const slayerageUserInfo = {
  id: "73013571",
  login: "slayerage",
  display_name: "Slayerage",
  type: "",
  broadcaster_type: "partner",
  description:
    "I'm the guy that solo'd crota, so in other words, I peaked years ago.",
  profile_image_url:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/ebbc05ea-4f37-49c2-92af-5deb1be7eedf-profile_image-300x300.png",
  offline_image_url:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/af3df634-c48b-40b9-b0c0-4017fb3073a5-channel_offline_image-1920x1080.png",
  view_count: 0,
  created_at: "2014-10-14T01:27:26Z",
};

twitchAxios.defaults.headers["Client-ID"] = process.env
  .TWITCH_CLIENT_ID as string;
twitchAxios.defaults.headers.Authorization = `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`;

const users = new Users();

describe("users", () => {
  test("should be defined", async () => {
    expect(users).toBeDefined();
  });

  test("should get user by id", async () => {
    const response = await users.getUserById(slayerageUserInfo.id);
    expect(response).toBeDefined();
    expect(response.data[0]).toMatchObject(slayerageUserInfo);
  });

  test("should get user by login", async () => {
    const response = await users.getUserByLogin(slayerageUserInfo.login);
    expect(response).toBeDefined();
    expect(response.data[0]).toMatchObject(slayerageUserInfo);
  });

  test("should fail to get user by id", async () => {
    await expect(users.getUserById("invalid")).rejects.toThrow(
      "Invalid username(s), email(s), or ID(s). Bad Identifiers."
    );
  });

  test("should fail to get user by login", async () => {
    await expect(users.getUserByLogin("")).rejects.toThrow(
      "Invalid username(s), email(s), or ID(s). Bad Identifiers."
    );
  });
});
