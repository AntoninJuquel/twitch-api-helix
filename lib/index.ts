import "module-alias/register";
import twitchApi from "./classes";

const { Twitch, Users, Games, Clips, Authentication } = twitchApi;

export { Twitch as default, Twitch, Users, Games, Clips, Authentication };
export * from "./types";
