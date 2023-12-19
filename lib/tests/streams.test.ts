import Streams from "../classes/streams";
import { twitchAxios } from "../globals";

twitchAxios.defaults.headers["Client-ID"] = process.env
  .TWITCH_CLIENT_ID as string;
twitchAxios.defaults.headers.Authorization = `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`;

describe("streams", () => {
  test("should be defined", async () => {
    const streams = new Streams();
    expect(streams).toBeDefined();
  });

  test("should get streams", async () => {
    const streams = new Streams();
    const response = await streams.getStreams({ first: 1 });
    expect(response).toBeDefined();
    expect(response.data.length).toBe(1);
  });

  test("should fail to get streams", async () => {
    const streams = new Streams();
    await expect(streams.getStreams({ first: -1 })).rejects.toThrow(
      'The parameter "first" was malformed: the value must be greater than or equal to 1'
    );
  });
});
