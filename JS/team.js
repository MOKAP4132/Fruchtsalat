// const cardTeam = document.querySelector('#cardTeam');
const teamCardContainer = document.querySelector("#teamCards");
const anzahlTeam = 3;

let meinTeam = [
    { 
        name : "Yara",
        skills : ["kreativ"],
        age : 22,
        city : "Zweisimmen"
    },
    { 
        name : "Moritz",
        skills : ["sportlich"],
        age : 24,
        city : "Muttenz"
    }, 
    { 
        name : "Manuela",
        skills : ["künstlerisch"],
        age : 23,
        city : "Wangen"
    }
]



// var card = document.querySelector('.card');
// card.addEventListener( 'click', function() {
//   card.classList.toggle('is-flipped');
// });

// teamCardContainer.innerHTML = "";
// meinTeam.forEach(team => {
//     let scene = document.createElement("div");
//     scene.className = "scene scene--card";

//     let card = document.createElement("div")
//     card.className = "card";
//     scene.appendChild(card);

//     // Vorderseite
//     let cardFront = document.createElement("div")
//     cardFront.className = "card__face card__face--front";

//     let frontHeader = document.createElement('div');
//     frontHeader.className = 'cardHeader';

//     let nameFrontElement = document.createElement('h2');
//     nameFrontElement.textContent = team.name;
//     frontHeader.appendChild(nameFrontElement);
//     cardFront.appendChild(frontHeader);

//     let teamImage = document.createElement('img');
//     teamImage.src =`../pictures/${team.name}.png`;
//     teamImage.alt = team.name;
//     teamImage.className = 'teamImage';
//     card.appendChild(teamImage);

//     card.appendChild(cardFront);
    
//     // Rückseite
//     let cardBack = document.createElement("div")
//     cardBack.className = "card__face card__face--back";

//     let backHeader = document.createElement('div');
//     backHeader.className = 'cardHeader';
    
//     let nameBackElement = document.createElement('h2');
//     nameBackElement.textContent = `Über ${team.name}`;
//     backHeader.appendChild(nameBackElement);
//     cardBack.appendChild(backHeader);

//     let infoList = document.createElement('ul');
//     infoList.className = 'infoList';
//     card.appendChild(infoList);

//     let city = document.createElement('li');
//     city.textContent = `aus ${city[meinTeam.indexOf(team.name)]}`;
//     infoList.appendChild(city);
    
//     let skills = document.createElement('li');
//     skills.textContent = `ist besonders ${skills[meinTeam.indexOf(team.name)]}`;
//     infoList.appendChild(skills);

//     let age = document.createElement('li');
//     age.textContent = `${age[meinTeam.indexOf(team.name)]}`;
//     infoList.appendChild(age);

//     //cardTeam.appendChild(card);

//     card.appendChild(cardBack);

//     card.addEventListener( 'click', function() {
//         card.classList.toggle('is-flipped');
//     });
//     teamCardContainer.appendChild(scene);
// });
//__________________________________________________
//dom loaded
//__________________________________________________


//__________________________________________________
//Event Listener
//__________________________________________________
document.addEventListener('DOMContentLoaded', function () {
    //cardTeam.innerHTML = '';
    meinTeam.forEach(team => {
       createCard(team);
    });

    let teamElementinDOM = document.querySelectorAll(".teamCard");
    teamElementinDOM.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.toggle("is-flipped");
        });
    });
});

// // Selektiere alle Elemente mit der Klasse 'teamCard'
// const teamCards = document.querySelectorAll('.teamCard');



//________________________________________________
//teamCard erstellen
//________________________________________________
function createCard(team) {
    let cardOuter = document.createElement('div');
    cardOuter.className = 'teamCardOuter';

    let card = document.createElement('div');
    card.className = 'teamCard';
    cardOuter.appendChild(card);

    //Vorderseite
    let cardFront = document.createElement("div")
    cardFront.className = "card__face card__face--front";
    card.appendChild(cardFront);

    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2');
    nameElement.textContent = team.name;
    cardHeader.appendChild(nameElement);
    cardFront.appendChild(cardHeader);

    let teamImage = document.createElement('img');
    teamImage.src =`../pictures/${team.name}.png`;
    teamImage.alt = team.name;
    teamImage.className = 'teamImage';
    cardFront.appendChild(teamImage);


    //Hinterseite
    let cardBack = document.createElement("div")
    cardBack.className = "card__face card__face--back";
    card.appendChild(cardBack);

    let backHeader = document.createElement('div');
    backHeader.className = 'cardHeader';

    let nameBackElement = document.createElement('h2');
    nameBackElement.textContent = `Über ${team.name}`;


    backHeader.appendChild(nameBackElement);
    cardBack.appendChild(backHeader);


    

    let infoList = document.createElement('ul');
    infoList.className = 'infoList';


    let city = document.createElement('li');
    city.textContent = `aus ${team.city}`;
    infoList.appendChild(city);

    
    let skills = document.createElement('li');
    skills.textContent = `ist besonders ${team.skills}`;
    infoList.appendChild(skills);

    let age = document.createElement('li');
    age.textContent = `${team.age}`;
    infoList.appendChild(age);

//     //cardTeam.appendChild(card);

//     card.appendChild(cardBack);


    cardBack.appendChild(infoList);






    teamCardContainer.appendChild(cardOuter);


    
    // let infoList = document.createElement('ul');
    // infoList.className = 'infoList';
    // card.appendChild(infoList);

    // let city = document.createElement('li');
    // city.textContent = `aus ${allcity[meinTeam.indexOf(team.name)]}`;
    // infoList.appendChild(city);
    
    // let skills = document.createElement('li');
    // skills.textContent = `ist besonders ${skills[meinTeam.indexOf(team.name)]}`;
    // infoList.appendChild(skills);

    // let age = document.createElement('li');
    // age.textContent = `${age[meinTeam.indexOf(team.name)]}`;
    // infoList.appendChild(age);

    // cardTeam.appendChild(card);

    // card.addEventListener('click', function() {
    //     console.log("flip me")
    //     if (card.classList.contains('back')) {
    //         card.classList.remove('back');
    //     } else {
    //         card.classList.add('back');
    //     }
    //     flipCard(card); // Aufruf der flipCard-Funktion und Übergabe des geklickten Elements
    // });
}

// function flipCard(card) {
//     if (card.classList.contains('flipped')) {
//         card.classList.remove('flipped');
//     } else {
//         card.classList.add('flipped');
//     }

//     let nameElement = document.createElement('h2');
//     nameElement.textContent = "über mich";
//     let cardHeader = card.querySelector(".cardHeader");
//     cardHeader.appendChild(nameElement);
//     card.appendChild(cardHeader);

//     let infoList = document.createElement('ul');
//     infoList.className = 'infoList';
//     card.appendChild(infoList);

//     let city = document.createElement('li');
//     city.textContent = `aus ${city[meinTeam.indexOf(team.name)]}`;
//     infoList.appendChild(city);
    
//     let skills = document.createElement('li');
//     skills.textContent = `ist besonders ${skills[meinTeam.indexOf(team.name)]}`;
//     infoList.appendChild(skills);

//     let age = document.createElement('li');
//     age.textContent = `${age[meinTeam.indexOf(team.name)]}`;
//     infoList.appendChild(age);

//     cardTeam.appendChild(card);
// }


