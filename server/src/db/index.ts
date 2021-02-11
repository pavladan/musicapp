import watchers from "./watchers";
import initPlayers from "./initPlayers";

export default () => {
  initPlayers().then(() => watchers());
};
