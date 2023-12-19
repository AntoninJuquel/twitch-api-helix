import Search from "../classes/search";
import { twitchAxios } from "../globals";

twitchAxios.defaults.headers["Client-ID"] = process.env
  .TWITCH_CLIENT_ID as string;
twitchAxios.defaults.headers.Authorization = `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`;

const search = new Search();

describe("search", () => {
  test("should be defined", async () => {
    expect(search).toBeDefined();
  });

  test("should search categories", async () => {
    const response = await search.searchCategories({
      query: "fortnite",
      first: 1,
    });
    expect(response).toBeDefined();
    expect(response.data.length).toBe(1);
    expect(response.data[0].name).toBe("Fortnite");
  });

  test("should search channels", async () => {
    const response = await search.searchChannels({
      query: "slayerage",
      first: 1,
    });
    expect(response).toBeDefined();
    expect(response.data.length).toBe(1);
    expect(response.data[0].display_name).toBe("Slayerage");
  });
});
