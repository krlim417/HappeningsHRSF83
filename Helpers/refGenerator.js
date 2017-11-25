module.exports = function ref(city) {
  return `${city.toLowerCase()}#${Math.floor(Math.random() * 1000000000)}`;
};
