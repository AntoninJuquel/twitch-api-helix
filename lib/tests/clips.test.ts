import Clips from "../classes/clips";
import { twitchAxios } from "../globals";

const destiny2ClipInfo = {
  id: "FaithfulNurturingCarabeefBIRB",
  url: "https://clips.twitch.tv/FaithfulNurturingCarabeefBIRB",
  embed_url: "https://clips.twitch.tv/embed?clip=FaithfulNurturingCarabeefBIRB",
  broadcaster_id: "73013571",
  broadcaster_name: "Slayerage",
  creator_id: "96359205",
  creator_name: "Cozmo_BNG",
  video_id: "",
  game_id: "497057",
  language: "en",
  title: "Raid win.",
  view_count: 357945,
  created_at: "2017-09-13T22:34:37Z",
  thumbnail_url:
    "https://clips-media-assets2.twitch.tv/26248518896-offset-22138.75080871582-33.16666666666667-preview-480x272.jpg",
  duration: 33.1,
  vod_offset: null,
  is_featured: false,
};

twitchAxios.defaults.headers["Client-ID"] = process.env
  .TWITCH_CLIENT_ID as string;
twitchAxios.defaults.headers.Authorization = `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`;

const clips = new Clips();

describe("clips", () => {
  test("should be defined", async () => {
    expect(clips).toBeDefined();
  });

  test("should get clips by id", async () => {
    const response = await clips.getClipsById(destiny2ClipInfo.id);
    expect(response).toBeDefined();
    expect(response.data[0].id).toBe(destiny2ClipInfo.id);
  });

  test("should get clips by game_id", async () => {
    const response = await clips.getClipsByGameId(destiny2ClipInfo.game_id);
    expect(response).toBeDefined();
    expect(response.data[0].id).toBe(destiny2ClipInfo.id);
  });

  test("should get clips by broadcaster_id", async () => {
    const response = await clips.getClipsByBroadcasterId(
      destiny2ClipInfo.broadcaster_id
    );
    expect(response).toBeDefined();
    expect(response.data[0].id).toBe(destiny2ClipInfo.id);
  });

  test("should fail to get clips by id", async () => {
    await expect(clips.getClipsById("invalid")).rejects.toThrow(
      'No clips found for {"id":"invalid"}'
    );
  });

  test("should fail to get clips by game_id", async () => {
    await expect(clips.getClipsByGameId("invalid")).rejects.toThrow(
      "invalid game id"
    );
  });

  test("should fail to get clips by broadcaster_id", async () => {
    await expect(clips.getClipsByBroadcasterId("invalid")).rejects.toThrow(
      'No clips found for {"broadcaster_id":"invalid"}'
    );
  });
});
