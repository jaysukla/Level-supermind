function Imagename() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  while (result.length < 5) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];

    if (!result.includes(randomCharacter)) {
      result += randomCharacter;
    }
  }

  return result;
}

module.exports = { Imagename };
