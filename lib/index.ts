import twitchApi from "./classes";

const { Twitch, Users, Games, Clips, Authentication, Search, Streams } =
  twitchApi;

export {
  Twitch as default,
  Twitch,
  Users,
  Games,
  Clips,
  Authentication,
  Search,
  Streams,
};
export * from "./types";
