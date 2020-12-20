export const trimString = (text: string) => {
  const splitString = text.toLowerCase().split("");
  let trimArray = [];
  for (let i = 0; i < splitString?.length; i++) {
    if (splitString[i] === " ") continue;
    trimArray.push(splitString[i]);
  }
  trimArray.sort();
  return trimArray.join("");
};
