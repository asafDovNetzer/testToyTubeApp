export const presentNumber = (number) => {
  let string = number.toString();
  let count = 0;
  let newString = ``;

  for (let i = string.length - 1; i >= 0; i--) {
    newString = string[i] + newString;
    if (count % 3 === 2 && i) {
      newString = `,` + newString;
    }
    count++;
  }
  return newString;
};

export const millisecsToString = (millisecs) => {
  const outputInSeconds = Math.round(millisecs / 1000);

  const seconds = (outputInSeconds % 60).toString().padStart(2, `0`);
  const minutes = Math.floor((outputInSeconds / 60) % 60)
    .toString()
    .padStart(2, `0`);
  const hours = Math.floor(outputInSeconds / 3600)
    .toString()
    .padStart(2, `0`);

  return `${hours}:${minutes}:${seconds}`;
};
