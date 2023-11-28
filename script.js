// const outputElement = document.querySelector(`div.output`)

// function newSquare(){
//     const newArticleEl = document.createElement(`artcile`)
//     newArticleEl.classList.add(`square`)
//     return newArticleEl;
// }
// for (let i = 1; i <= 100; i++){
//     const element = newSquare();
//     element.append(i);
//     outputElement.appendChild(element);
//     element.addEventListener('click', function(){
//      element.classList.toggle('clicked');})
// }
const mainContentEl = document.querySelector('section.main-content');

const startButtonEl = document.querySelector('#start-btn');

const difficultySelectorEl = document.querySelector('#game-mode');

startButtonEl.addEventListener('click', function(){
    generateNewGame(mainContentEl, difficultySelectorEl);
});
function generateNewGame(wrapperElement, levelSelector){
    wrapperElement.innerHTML = '';


    let userScore = 0;
    let isGameOver = false;

    const level = parseInt(levelSelector.value);
    let cellsNo;

    switch (level){
        case 0:
        default:
            cellsNo = 100;
            break;
        case 1:
            cellsNo = 81;
            break;
        case 2:
            cellsNo = 49;
            break;
    }

    let cellsPerRow = Math.sqrt(cellsNo);

    const bombs = [];
    while( bombs.length < 16){
        let randomNumber = getRandomNumber(1, cellsNo)
        if ( !bombs.includes(randomNumber) ){
            bombs.push(randomNumber);
        }
    }

    console.log(bombs);

    for (let i = 1 ; i <= cellsNo ; i++){
        const currentSquare = newSquare();
        const squareContent = i;

        const cellSize = `calc(100% / ${cellsPerRow})`;
        currentSquare.style.width = cellSize;
        currentSquare.style.height= cellSize;

        if ( bombs.includes(squareContent) ){
            currentSquare.classList.add('bg-red');
        }

        currentSquare.addEventListener('click', function(){
            if (!isGameOver){
                currentSquare.classList.add('clicked');

                if ( !bombs.includes(squareContent) ){
                    const bombChecker = [
                        squareContent - 1,
                        squareContent + 1,
                        squareContent - cellsPerRow -1,
                        squareContent - cellsPerRow,
                        squareContent - cellsPerRow + 1,
                        squareContent + cellsPerRow - 1,
                        squareContent + cellsPerRow ,
                        squareContent + cellsPerRow + 1
                    ];

                    let closeBombs = 0;

                    for (let index = 0; index < bombChecker.length; index++) {
                        if (bombs.includes(bombChecker[index])){
                            closeBombs++;
                        }
                    }

                    currentSquare.innerHTML += `<span> ${closeBombs} </span>`;


                    currentSquare.classList.add('bg-blue');
                    console.log(++userScore);
                    updateCurrentScore(`Your score is ${userScore}`);
                } else {
                    isGameOver = true;
                    currentSquare.innerHTML = `<span> <i class="fa-solid fa-bomb fa-beat"></i> </span>`;
                    updateCurrentScore(`Game over: your score is ${userScore}`);
                    // ? tutte le altre bombe, scopritevi.
                    showBombCells();
                    //
                }
            }
        }, { once: true });

        wrapperElement.appendChild(currentSquare);
    }
}
function newSquare(){
    const newSquareElement = document.createElement('article');
    newSquareElement.classList.add('square');
    return newSquareElement;
}



function getRandomNumber(minNumber, maxNumber){
    return Math.floor( Math.random() *(maxNumber - minNumber + 1) + minNumber);
}

function updateCurrentScore(scoreToUpdate){
    const scoreboardEl = document.getElementById('scoreboard');
    scoreboardEl.innerText = scoreToUpdate;
}

function showBombCells(){
    const bombElements = document.querySelectorAll('article.bg-red');
    for (let index = 0; index < bombElements.length; index++) {
        const bombElement = bombElements[index];
        bombElement.classList.add('clicked');
        bombElement.innerHTML = `<span> <i class="fa-solid fa-bomb"></i> </span>`;

    }
}