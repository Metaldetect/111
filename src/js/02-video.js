import Player from "@vimeo/player";

import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const vimeoPlayer = new Player(iframe, {
  title: true,
  autoplay: true,
  loop: false,
  fullscreen: true,
  quality: "1080p",
});

const time_key = "videoplayer-current-time";

const getCurrentTime = function (currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem(time_key, JSON.stringify(seconds));
};

vimeoPlayer.on("timeupdate", getCurrentTime);

const handlePlay = throttle(function (data) {
  const currentTime = data.seconds;
  localStorage.setItem(time_key, JSON.stringify(currentTime));
}, 1000);

vimeoPlayer.on("play", handlePlay);

vimeoPlayer.setCurrentTime(JSON.parse(localStorage.getItem(time_key)) || 0);
