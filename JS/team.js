const teamCardContainer = document.querySelector("#teamCards");
const anzahlTeam = 3;

let meinTeam = [
    { 
        name : "Yara",
        skills : ["kreativ"],
        age : 22,
        city : "Zweisimmen",
        favorite : "Ananas"
    },
    { 
        name : "Moritz",
        skills : ["sportlich"],
        age : 24,
        city : "Muttenz",
        favorite : "Kirsche"
    }, 
    { 
        name : "Manuela",
        skills : ["künstlerisch"],
        age : 23,
        city : "Wangen",
        favorite : "Banane"
    }
]


//__________________________________________________
//dom loaded
//__________________________________________________
//Event Listener
//__________________________________________________
document.addEventListener('DOMContentLoaded', function () {
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
    teamImage.src =`../pictures/${team.name}.jpg`;
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
    skills.textContent = `ist ${team.skills}`;
    infoList.appendChild(skills);

    let age = document.createElement('li');
    age.textContent = `${team.age}`;
    infoList.appendChild(age);

    let favorite = document.createElement('li');
    favorite.textContent = `is(s)t eine ${team.favorite}`;
    infoList.appendChild(favorite);


    cardBack.appendChild(infoList);
    teamCardContainer.appendChild(cardOuter);

}