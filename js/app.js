/*
 * Create a list that holds all of your cards
 */


let cards = document.querySelectorAll('.card i');
cards = [...cards];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const moves = document.querySelector('.score-panel span.moves');
let movesNum = moves.textContent;
const restart = document.querySelector('.restart');
let matched;
let openList = [];
let starRating;

restart.addEventListener('click', start)

let deck = document.querySelector('.deck');


let stars = document.querySelector('.stars').children;
stars = [...stars];

let timer = document.querySelector('.timer');
let time;
let sec;
let min;

// start the game
function start() {

    matched = 0;
    moves.textContent = 0;
    movesNum = 0;
    openList = [];
    starRating = 3;

    sec = 0;
    min = 0;
    window.clearInterval(time);
    timer.innerHTML = `00:00`;

    time = setInterval(showtimer, 1000);

    deck.innerHTML = '';

    shuffle(cards);

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 16; i++) {
        let li = document.createElement('li');
        li.classList.add('card');

        let elem = cards[i];
        li.appendChild(elem);
        fragment.appendChild(li);
    }

    deck.appendChild(fragment);

    for (let i of stars) {
        i.style.color = 'yellow';
    }



}

start();

// show the time
function showtimer() {
    sec += 1;

    if (sec % 60 === 0) {
        min += 1;
        sec = 0;
    }

    let secT;
    let minT;

    if (sec < 10) {
        secT = '0' + sec;
    } else {
        secT = sec;
    }

    if (min < 10) {
        minT = '0' + min;
    } else {
        minT = min;
    }

    timer.innerHTML = `${minT}:${secT}`;

}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', showCard);


//show the card symbol
function showCard(e) {
    e.preventDefault();
    let item = e.target;

    if (openList.length <= 2) {

        if (!item.classList.contains('open')) {
            item.classList.add('show');
            item.classList.add('open');

            openList.push(item);
            if (openList.length === 2) {
                compare(openList);
                openList = [];

            }

        }

    }

}


// increment the move number
function incrementMove() {
    movesNum += 1;
    moves.textContent = movesNum;
    if (movesNum > 10 && movesNum < 30) {
        stars[0].style.color = 'yellow';
        stars[1].style.color = 'yellow';
        stars[2].style.color = 'black';
        starRating = 2;
    }
    else if (movesNum >= 30) {
        stars[0].style.color = 'yellow';
        stars[1].style.color = 'black';
        stars[2].style.color = 'black';
        starRating = 1;
    }
}


// compare two class list
function compare(openList) {

    let item1 = openList[0].firstChild.classList;
    item1 = [...item1];

    let item2 = openList[1].firstChild.classList;
    item2 = [...item2];

    if (item1[1] === item2[1]) {
        openList[0].classList.remove('show');
        openList[0].classList.remove('open');
        openList[0].classList.add('match');

        openList[1].classList.remove('open');
        openList[1].classList.remove('show');
        openList[1].classList.add('match');

        matched += 2;

    } else {

        setTimeout(function () {

            openList[0].classList.remove('show');
            openList[0].classList.remove('open');

            openList[1].classList.remove('open');
            openList[1].classList.remove('show');
            incrementMove();

        }, 500);

    }

    if (matched === 16) {

        setTimeout(finale, 500);
    }

}

function finale() {
    congrate();
    window.clearInterval(time);
}



function congrate() {
    let modal = document.getElementById('myModal');
    let p = modal.querySelector('p');
    let span = document.querySelector('.close');
    let play = document.querySelector('#play');

    p.innerHTML = `You Won, score: ${movesNum}. Time: ${timer.innerHTML}. Star Rating: ${starRating}`;
    modal.style.display = "block";

    span.addEventListener('click', function () {
        modal.style.display = "none";
    });

    play.addEventListener('click', function () {
        modal.style.display = "none";
        start();
    });
}







