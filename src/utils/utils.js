export const formatMovieDuration = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return [
    hours.toString().padStart(2, `0`),
    minutes.toString().padStart(2, `0`),
    seconds.toString().padStart(2, `0`)
  ].join(`:`);
};

export const formatMinutsMovieDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${(`0` + minutes).slice(-2)}m`;
};
