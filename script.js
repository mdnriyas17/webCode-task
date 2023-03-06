const uri = "https://api.openbrewerydb.org/breweries";
const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
let countries = [];
//  TO SEARCH NAME
function handleSearch(target) {
  const search = target.value.toLowerCase();
  const searchMatch = countries.filter((element) => {
    const name = element.name.toLowerCase();
    return name.includes(search);
  });
  renderCards(searchMatch);
}
/// ASYNC FUNCTION
async function fetchData() {
  const response = await fetch("https://api.openbrewerydb.org/breweries");
  const data = await response.json();
  if (data.length > 0) {
    countries = [...data];
    renderCards(countries);
  }
}
//FETCH DATA
fetchData();
function renderCards(data = []) {
  // TRAVERSE THROIUGH DATA AND CREATE CARDS
  // NODES OF CARDS
  let cards = [];
  for (let i = 0; i < data.length; i++) {
    cards.push(createCard(data[i]));
  }
  
  // EXISTING VALUE ARE KICKED-OUT
  countriesContainer.innerHTML = "";
  // NEW CARDS ARE ALLOWED IN AND UI RE-RENDERED
  countriesContainer.append(...cards)

  .catch((error) => {
  console.error('Data Fetching Error:', error);
  });
}
// CREATE ELEMENTS
function createCard(data = {}) {
  let card = document.createElement("div");
  let title = document.createElement("h2");
  let subHeading = document.createElement("p");
   let type = document.createElement("p")
   let street1= document.createElement("p");
   let phn=document.createElement("p");
   let web=document.createElement('p');
// SET ATTRIBUTIES
  card.setAttribute("class", "card");

  // OBJECT DESTRCUTING 
  const { name = "", id = "", brewery_type = "",street="", website_url ='',phone=""} = data;
  title.innerText =name;
  subHeading.innerText = id;
  type.innerText=brewery_type;
  street1.innerText=street;
  phn.innerText=phone;
  web.innerHTML=website_url;
  card.append(title, subHeading, type,street1,phn,web);

  return card;
}