const getCharacters = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const jsonRes = await response.json();
  console.log(jsonRes.results);
  return jsonRes.results;
};

const toggleMoreInformation = (id) => {
  console.log("toggle called", id);
  const infoDiv = document.getElementById(id);
  infoDiv.classList.toggle("active");
};

const createHomeage = async () => {
  const characters = await getCharacters();
  const charactersContainer = document.querySelector(".characters");
  createCharacterList(characters, charactersContainer);
};

const createCharacterList = async (data, container) => {
  for (let i = 0; i < data.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("character");

    const headingDiv = document.createElement("div");
    headingDiv.classList.add("heading");

    const title = document.createElement("h1");
    const moreInfo = document.createElement("p");
    moreInfo.addEventListener("click", () =>
      toggleMoreInformation(`list-${data[i].id}`)
    );
    const information = `${data[i].name}`;
    title.innerHTML = information;
    moreInfo.innerHTML = "More Info";
    headingDiv.appendChild(title);
    headingDiv.appendChild(moreInfo);

    const moreInfoDiv = document.createElement("div");
    moreInfoDiv.classList.add("more-info");
    moreInfoDiv.id = `list-${data[i].id}`;
    const imageSrc = data[i].image;
    const imageDiv = document.createElement("img");
    imageDiv.src = imageSrc;
    const gender = document.createElement("p");
    const location = document.createElement("p");
    const species = document.createElement("p");
    const status = document.createElement("p");
    gender.innerHTML = `Gender: ${data[i].gender}`;
    location.innerHTML = `Location: ${data[i].location.name}`;
    species.innerHTML = `Species: ${data[i].species}`;
    status.innerHTML = `Status: ${data[i].status}`;
    moreInfoDiv.appendChild(imageDiv);
    moreInfoDiv.appendChild(gender);
    moreInfoDiv.appendChild(location);
    moreInfoDiv.appendChild(species);
    moreInfoDiv.appendChild(status);

    newDiv.appendChild(headingDiv);
    newDiv.appendChild(moreInfoDiv);
    container.appendChild(newDiv);
  }
};

createHomeage();

const findCharacter = async () => {
  const inputValue = document.getElementById("seachInput").value;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${inputValue}&status=alive`
  );
  const jsonRes = await response.json();
  console.log(jsonRes);
  const searchResults = document.querySelector(".search-results");
  document.querySelector(".search-results").innerHTML = "";
  createCharacterList(jsonRes.results, searchResults);
};
const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", findCharacter);

const clearSearch = document.querySelector("#clearSearch");
clearSearch.addEventListener("click", () => {
  console.log("clear called");
  document.querySelector(".search-results").innerHTML = "";
  document.getElementById("seachInput").value = "";
});
