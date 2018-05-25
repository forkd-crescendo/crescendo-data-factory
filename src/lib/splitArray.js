module.exports = ({ size, length }) => {
  if (size < length) {
    throw new Error("lenght is greater than size!");
  }
  const array = Array.from(Array(length)).map(() => 1);
  let remainingElements = size - length;

  do {
    const randomIndex = Math.floor(Math.random() * Math.floor(length));
    array[randomIndex]++;
    remainingElements--;
  } while (remainingElements);
  return array;
};
