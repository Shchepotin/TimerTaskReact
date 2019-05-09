const getRandom = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min) + min + 1);
};

export default getRandom;
