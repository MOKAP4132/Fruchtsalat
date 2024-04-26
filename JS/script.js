//Konstanten und Variablen definieren
const searchBocks = document.querySelector('#search');
const app = document.querySelector('#app');
const anzahlPokemon = 151;
let allPokemon = [];

//___________________________________________________________
//Kernfunktionen
//___________________________________________________________

//Die ursprünglichen 151 werden geladen, in allPokemon gespeichert und die Karten erstellt
async function init() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${anzahlPokemon}&offset=0`;
    let pokemonWithoutDetails = await fetchData(url);
    allPokemon = await Promise.all(pokemonWithoutDetails.results.map(async (pokemon) => {
        let detailedData = await fetchData(pokemon.url); // Fetch detailed data for each Pokémon
        return detailedData; // Return detailed data instead of basic
    }));
    allPokemon.forEach(pokemon => {
        createCard(pokemon);
    });
}


//Eingabe wird geprüft, das Array gefiltert und die Karten neu erstellt
async function suchePokemon(searchInput) {
    let filteredPokemon = allPokemon.filter(wantedPokemon => wantedPokemon.name.includes(searchInput));
    app.innerHTML = '';
    filteredPokemon.forEach(pokemon => {
        createCard(pokemon);
    });
}



//___________________________________________________________
//Eventlistener
//___________________________________________________________

//dom loaded
document.addEventListener('DOMContentLoaded', function () {
    init();
});

//eventlistener searchBocks input
searchBocks.addEventListener('input', function () {
    suchePokemon(searchBocks.value);
});


//___________________________________________________________
//Grundfunktionen
//___________________________________________________________

//Fetch
async function fetchData(url) {  // asynchrone Funktion, die auf ein Promise wartet
    try { // try-catch-Block, um Fehler abzufangen
        let response = await fetch(url); // auf das Promise warten und dann die Response in die Variable speichern
        let data = await response.json(); // Extract JSON from the http response
        return data;
    }
    catch (error) { // Fehlerbehandlung
        console.log(error);
    }
}

//PokeCard erstellen
function createCard(pokemon) {
    let card = document.createElement('div');
    card.className = 'pokemonCard';

    // Header area with name and types
    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2');
    nameElement.textContent = pokemon.name;
    cardHeader.appendChild(nameElement);

    let typesContainer = document.createElement('div');
    typesContainer.className = 'typesContainer';

    pokemon.types.forEach(item => {
        let typeIcon = document.createElement('div');
        typeIcon.className = `icon ${item.type.name}`; // Use the class for the type
        let typeSVG = document.createElement('img');
        typeSVG.src = `icons/${item.type.name}.svg`; // Assuming you have SVGs named after types
        typeSVG.alt = item.type.name;
        typeIcon.appendChild(typeSVG);
        typesContainer.appendChild(typeIcon);
    });

    cardHeader.appendChild(typesContainer);
    card.appendChild(cardHeader);

    // Image
    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.other.home.front_default; //hier ist in der API das Bild des Pokemons hinterlegt
    pokemonImage.alt = pokemon.name;
    pokemonImage.className = 'pokemonImage';
    card.appendChild(pokemonImage);

    // Details area with stats
    let detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';

    let statsList = document.createElement('ul');
    statsList.className = 'statsList';

    pokemon.stats.forEach(stat => {
        let statItem = document.createElement('li');
        let statName = document.createElement('strong');
        statName.textContent = `${stat.stat.name}: `;
        statItem.appendChild(statName);
        statItem.appendChild(document.createTextNode(stat.base_stat));
        statsList.appendChild(statItem);
    });

    detailsDiv.appendChild(statsList);
    card.appendChild(detailsDiv);

    app.appendChild(card);
}






//___________________________________________________________
