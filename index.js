const getCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonRes = await response.json();
  console.log(jsonRes.results);
  return jsonRes.results;
};
