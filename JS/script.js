//Konstanten und Variablen definieren
const searchBox = document.querySelector('#search');
const app = document.querySelector('#app');
const anzahlFrucht = 49;
let allFrucht = [];

//___________________________________________________________
//Kernfunktionen
//___________________________________________________________

//Die ursprünglichen 49 werden geladen, in allFrucht gespeichert und die Karten erstellt
async function init() {
    let fruit = await fetchData('API/api_extract.php'); //hier wird die fetch Funktion aufgerufen
    console.log(fruit);
    fruit.forEach(frucht => {
        createCard(frucht);
    });
}


async function fetchData(url) { //die fetch Funktion wird aufgerufen
    try { 
        let response = await fetch(url); 
        let data = await response.json(); 
        allFrucht = data;
        return data; 
    } catch (error) { 
        console.log(error);
    }
}


//Eingabe wird geprüft, das Array gefiltert und die Karten neu erstellt
async function sucheFrucht(searchInput) {
    let filteredFrucht = allFrucht.filter(wantedFrucht => wantedFrucht.name.includes(searchInput)); //hier wird das Array gefiltert
    app.innerHTML = ''; //hier wird der Inhalt des app-Elements geleert
    filteredFrucht.forEach(frucht => { //forEach durchläuft alle Elemente des Arrays
        createCard(frucht);//und erstellt für jedes Element eine Karte
    });
}



//___________________________________________________________
//Eventlistener
//___________________________________________________________

//dom loaded
document.addEventListener('DOMContentLoaded', function () { //wenn die Seite geladen ist, wird die Funktion init aufgerufen
    init();
});

//eventlistener searchBox input
searchBox.addEventListener('input', function () { //wenn in das Suchfeld etwas eingegeben wird, wird die Funktion sucheFrucht aufgerufen
    sucheFrucht(searchBox.value);
    
});


//___________________________________________________________
//Grundfunktionen
//___________________________________________________________

//FruchtCard erstellen
function createCard(frucht) { //hier wird die Karte erstellt
    let card = document.createElement('div');
    card.className = 'fruchtCard';

    // Header area with name and types
    let cardHeader = document.createElement('div'); //hier wird der Header der Karte erstellt
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2'); //hier wird die Überschrift der Frucht erstellt
    nameElement.textContent = frucht.name; //hier wird der Name der Frucht eingefügt
    cardHeader.appendChild(nameElement); //für jedes Element wird ein Kind erstellt
    card.appendChild(cardHeader);


    // // Image
    let fruchtImage = document.createElement('img');
    fruchtImage.src =`../pictures/${frucht.name}.png`; //hier ist in der API das Bild der Frucht hinterlegt
    fruchtImage.alt = frucht.name;
    fruchtImage.className = 'fruchtImage';
    card.appendChild(fruchtImage);
    
   
    let list = document.createElement('ul');
    list.className = 'NutritionList';
    card.appendChild(list);

    let Kalorien = document.createElement('li');
    Kalorien.textContent = `Calories: ${frucht.nutritions.calories}`;
    list.appendChild(Kalorien);

    let Fett = document.createElement('li');
    Fett.textContent = `Fat: ${frucht.nutritions.fat}`;
    list.appendChild(Fett);

    let Protein = document.createElement('li');
    Protein.textContent = `Protein: ${frucht.nutritions.protein}`;
    list.appendChild(Protein);

    let Kohlenhydrate = document.createElement('li');
    Kohlenhydrate.textContent = `Carbohydrates: ${frucht.nutritions.carbohydrates}`;
    list.appendChild(Kohlenhydrate);

    let Zucker = document.createElement('li');
    Zucker.textContent = `Sugar: ${frucht.nutritions.sugar}`;
    list.appendChild(Zucker);

    app.appendChild(card);
}


