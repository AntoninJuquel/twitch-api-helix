import Games from "../classes/games";
import { twitchAxios } from "../globals";

const destiny2GameInfo = {
  id: "497057",
  name: "Destiny 2",
  box_art_url:
    "https://static-cdn.jtvnw.net/ttv-boxart/497057-{width}x{height}.jpg",
  igdb_id: "25657",
};

twitchAxios.defaults.headers["Client-ID"] = process.env
  .TWITCH_CLIENT_ID as string;
twitchAxios.defaults.headers.Authorization = `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`;

const games = new Games();

describe("games", () => {
  test("should be defined", async () => {
    expect(games).toBeDefined();
  });

  test("should get top games", async () => {
    const response = await games.getTopGames();
    expect(response).toBeDefined();
  });

  test("should get game by id", async () => {
    const response = await games.getGameById(destiny2GameInfo.id);
    expect(response).toBeDefined();
    expect(response.data[0]).toMatchObject(destiny2GameInfo);
  });

  test("should get game by name", async () => {
    const response = await games.getGameByName(destiny2GameInfo.name);
    expect(response).toBeDefined();
    expect(response.data[0]).toMatchObject(destiny2GameInfo);
  });

  test("should get game by igdb_id", async () => {
    const response = await games.getGameByIgdbId(destiny2GameInfo.igdb_id);
    expect(response).toBeDefined();
    expect(response.data[0]).toMatchObject(destiny2GameInfo);
  });

  test("should fail to get game by id", async () => {
    await expect(games.getGameById("invalid")).rejects.toThrow(
      'No games found for {"id":"invalid"}'
    );
  });

  test("should fail to get game by name", async () => {
    await expect(games.getGameByName("invalid")).rejects.toThrow(
      'No games found for {"name":"invalid"}'
    );
  });

  test("should fail to get game by igdb_id", async () => {
    await expect(games.getGameByIgdbId("invalid")).rejects.toThrow(
      'No games found for {"igdb_id":"invalid"}'
    );
  });
});
