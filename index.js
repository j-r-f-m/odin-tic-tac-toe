// +++++++++++++++++++++++++++++++++++ Create DOM Objects +++++++++++++++++++++
const createPages = (() => {
    // function that creates the pages of the game

    // select main-node to append children from the functions
    const mainContainer = document.querySelector('main');
    
    // 
    let gameBoardArray = [];

    const createStartBtn = () => {
        // function that creates start button
        const startBtn = document.createElement('button');
        startBtn.setAttribute('id', 'btn-start');
        startBtn.setAttribute('class', 'btn');
        startBtn.setAttribute('type', 'button');
        startBtn.textContent = 'Start PVP Game';
        startBtn.addEventListener('click', createPages.createPlayerForm);
        mainContainer.appendChild(startBtn);
        //test
        //console.log(startBtn);
    }

    const dltChildNode = function dltBtn(nodeName) {
        // function that deletes child node of parent element
        const childNode = document.querySelector(nodeName);
        childNode.parentElement.removeChild(childNode);
        
        // test
        //console.log('delete start btn');
    }


    const createPlayerForm = () => {
        // function that creates form so players can insert names

        // delete start button from dom
        dltChildNode('#btn-start');


        // create from
        const playerForm = document.createElement('form');
        playerForm.setAttribute('class', 'form-players');
        playerForm.setAttribute('action',' ')
        mainContainer.appendChild(playerForm);
        // create title for form
        const divTitle = document.createElement('player-title');
        divTitle.setAttribute('class', 'player-title');
        playerForm.appendChild(divTitle);

        const h1 = document.createElement('h1');
        h1.textContent = 'Enter Player Names';
        divTitle.appendChild(h1);
        // create player input div
        const divPlyrIpt = document.createElement('div');
        divPlyrIpt.setAttribute('class', 'player-inputs');
        playerForm.appendChild(divPlyrIpt);

        const divPlyr1 = document.createElement('div');
        divPlyr1.setAttribute('class', 'input-p1');
        divPlyrIpt.appendChild(divPlyr1);

        const labelP1 = document.createElement('label');
        labelP1.setAttribute('for', 'name-p1');
        labelP1.textContent = 'P1-Name: ';
        divPlyr1.appendChild(labelP1);

        const inputP1 = document.createElement('input');
        inputP1.setAttribute('name', 'name-p1');
        inputP1.setAttribute('id', 'name-p1'); 
        inputP1.setAttribute('type', 'text');
        inputP1.setAttribute('required', '');
        divPlyr1.appendChild(inputP1);

        const divPlyr2 = document.createElement('div');
        divPlyr2.setAttribute('class', 'input-p2');
        divPlyrIpt.appendChild(divPlyr2);

        const labelP2 = document.createElement('label');
        labelP2.setAttribute('for', 'name-p2');
        labelP2.textContent = 'P2-Name: ';
        divPlyr2.appendChild(labelP2);        

        const inputP2 = document.createElement('input');
        inputP2.setAttribute('name', 'name-p2');
        inputP2.setAttribute('id', 'name-p2'); 
        inputP2.setAttribute('type', 'text');
        inputP2.setAttribute('required', '');
        divPlyr2.appendChild(inputP2);
        // create submit button for form
        const divSbtBtn = document.createElement('div');
        divSbtBtn.setAttribute('class', 'btn-submit-container');
        playerForm.appendChild(divSbtBtn);

        // create submit button after clicking submit btn players can play
        const sbtBtn = document.createElement('button');
        sbtBtn.setAttribute('id', 'btn-submit');
        sbtBtn.setAttribute('class', 'btn');
        sbtBtn.setAttribute('type', 'submit');
        sbtBtn.textContent = 'Submit Names';
        //sbtBtn.addEventListener('click',createPages.createPlayersDisplay);
        sbtBtn.addEventListener('click', () => {
            createPlayersDisplay();
            
            // I tried to call the createBoard() function here but it broke my
            // form validation 
            //createBoard();
        });
        divSbtBtn.appendChild(sbtBtn);

        // test        
        //console.log('LOl')
    }

    const createPlayersDisplay = () => {
        // create score display 

        // form validation - the automatic validation does not work I had to add
        // the following code 
        const inputPlyr1 = document.getElementById('name-p1').value;
        const inputPlyr2 = document.getElementById('name-p2').value;

        if (inputPlyr1 === '') {
            return;
        } else if (inputPlyr2 === '') {
            return
        }

        // give palyer objects the name
        gameFlow.player1.name = inputPlyr1;
        gameFlow.player2.name = inputPlyr2;
        
        
        // test
        //console.log(player1)

        // add name dispaly and game score
        const divMainTitle = document.createElement('div');
        divMainTitle.setAttribute('class', 'main-title-container');
        mainContainer.appendChild(divMainTitle);
        // player 1
        const divPlayer1 = document.createElement('div');
        divPlayer1.setAttribute('class', 'display-player-1');
        //divPlayer1.textContent = `${player1.name} has ${player1.wins} wins.`;
        divPlayer1.textContent = `${inputPlyr1} - Wins: 0`;
        divMainTitle.appendChild(divPlayer1);
        // player 2
        const divPlayer2 = document.createElement('div');
        divPlayer2.setAttribute('class', 'display-player-2');
        divPlayer2.textContent = `${inputPlyr2} - Wins: 0.`;
        divMainTitle.appendChild(divPlayer2);

        // give player one initiative from the start
        gameFlow.markTrnPlyr1();

        // needs to be called here because of form validation
        createBoard();
    }
    
    const restartBtn = () => {
        // create button that restarts game on lick
        const divMain = document.querySelector('main');
        const rstBtn = document.createElement('button');
        rstBtn.setAttribute('id', 'btn-restart');
        rstBtn.setAttribute('class', 'btn');
        rstBtn.setAttribute('type', 'button');
        rstBtn.textContent = 'Restart Button';
        //sbtBtn.addEventListener('click',createPages.createPlayersDisplay);
        rstBtn.addEventListener('click', () => {
            dltChildNode('.game-board');
            dltChildNode('#btn-restart');
            createBoard();
        });
        divMain.appendChild(rstBtn);
        
        
        
        console.log('restart button');
    }

    const tileNotClickable = () => {
        // make tiles not clickable after one player wins

        // select all tiles in document
        const tileArr = document.getElementsByClassName('tile');
        console.log(tileArr);

        // iterate over array and remove the eventlisteners from the tiles
        // so tiles can not be clicked anymore
        for (let i = 0; i < tileArr.length; i++) {
            tileArr[i].removeEventListener('click', gameFlow.clickTile);
        }

        
    }

    const createBoard = () => {
        // test
        //console.log('lol game Board');
        // delete name submit form
        const divMain = document.querySelector('main');
        
        // test
        //console.log(divMain);

        // empty gameBoardArray() if user clicks restart after winning one game
        gameBoardArray.length = 0;
        //console.log(gameBoardArray);

        // check if main has a child with the class name of form-palyers
        if (divMain.querySelector('.form-players') !== null) {
            dltChildNode('.form-players');
        }
        
        //dltChildNode('.form-players');
    
 
        const boardContainer = document.createElement('div'); 
        boardContainer.setAttribute('class', 'game-board');
        mainContainer.appendChild(boardContainer);

        let i = 1; 
        while (i < 10) {
        // create game board tiles
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.setAttribute('id',`tile-${i}`);
        boardContainer.appendChild(tile);
        tile.addEventListener('click',gameFlow.clickTile);
        // add empty img array so that checkWinConditions() does not throw error
        const imgEmpy = document.createElement('img');
        imgEmpy.setAttribute('class', `tile-${i}`)
        tile.appendChild(imgEmpy);


        // push tiles into  gameBoardArray
        gameBoardArray.push(tile);
        i++;

        //console.log(gameBoardArray)
        }
        // mark starting player
        //gameFlow.markPlayerTurn();
    }
    


    return {
        createStartBtn,  createPlayerForm, createBoard, tileNotClickable,
        createPlayersDisplay, restartBtn,
        gameBoardArray,
    }
})();


// ++++++++++++++++++++++++++++++ Player Objects ++++++++++++++++++++++++++++++
const createPlayer = (name, wins) => {
    // create palyers to store win count and palyer name

    const wonLastRound = false;
    return {name, wins, wonLastRound};
}

//*++++++++++++++++++++++++++++++ GAME FLOW +++++++++++++++++++++++++++++++++ */
const gameFlow = (()=> {


    const player1 = createPlayer('Player-1', 0);
    const player2 = createPlayer('Player-2', 0);
    console.log(player1);
    // start button gets created, players will be able to choose in a second 
    // implementation if they want to play pvp or pve
    // after chossing pvp players will be able to enter their names
    // after entering their names the game will start
    createPages.createStartBtn();

    // keep track of who's turn it is
    // player 1 always starts
    const whoTurn = {turn: 'player1'}

    const markTrnPlyr1 = () => {
        // mark player-1 display so users can see which player has the initiative

        const displayP1 = document.querySelector('.display-player-1');
        const displayP2 = document.querySelector('.display-player-2');
        
        displayP1.style.backgroundColor = 'green';
        displayP2.style.backgroundColor = 'white';
        

    }

    const markTrnPlyr2 = () => {
        // mark player-2 display so users can see which player has the initiative

        const displayP1 = document.querySelector('.display-player-1');
        const displayP2 = document.querySelector('.display-player-2');
        
        displayP1.style.backgroundColor = 'white';
        displayP2.style.backgroundColor = 'green';
        

    }

    const checkForDraw = () => {
        // functions checks if all tiles have been clicked
        // all tiles have been clicked when every "img" element has a "class"
        // of "X" or "O".

        const array = [];
        const tilesNodeList = document.querySelectorAll('.tile');
        // test
        // console.log(tilesNodeList)

        for (let i = 0; i < tilesNodeList.length; i++) {
            //test
            //console.log(tilesNodeList[i].firstChild.className)
            if (
                tilesNodeList[i].firstChild.className === 'X'||
                tilesNodeList[i].firstChild.className === 'O'
                ) {
                    // an "img" element hast the class name x or o push an 1 into 
                    // the array
                    array.push(1);
                    // test
                    //console.log(array);
                } 
            if (array.length === 9) {
                // if the array has a lenght of 9 all tiles have been clicked
                
                // test
                //console.log('all tiles have been clicked -> Draw')
                return true;
            }
        }

        
    }

    const playerWins = (arrayWinningTiles, winningPlayer) => {

        // change color of winning tiles
        const divTilesList =  document.querySelectorAll('.tile');
        for (let i = 0; i < arrayWinningTiles.length; i++) {
            divTilesList[arrayWinningTiles[i]].style.backgroundColor = 'red';
        }
        
        //
        createPages.restartBtn();

        // change total wins of winning player
        if (winningPlayer === 'player-1') {
            gameFlow.player1.wins += 1;
            console.log(gameFlow.player1)
        } else if (winningPlayer === 'player-2') {
            gameFlow.player2.wins += 1;
            console.log(gameFlow.player2)
        }

    }

    const checkWinConditions = () => {
        // function contains winning conditions


        const checkDraw = checkForDraw();
        // test
        // console.log(checkDraw)
       
        if (  // first row wins
            createPages.gameBoardArray[0].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[1].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[2].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            playerWins([0, 1, 2], 'player-1');
            // make tiles not after win
            createPages.tileNotClickable();
            return
        } else if(
            createPages.gameBoardArray[0].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[1].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[2].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // second row
            createPages.gameBoardArray[3].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[5].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[3].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[5].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // third row
            createPages.gameBoardArray[6].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[7].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[8].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[6].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[7].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[8].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // first column
            createPages.gameBoardArray[0].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[3].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[6].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[0].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[3].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[6].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // second column
            createPages.gameBoardArray[1].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[7].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[1].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[7].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // third column
            createPages.gameBoardArray[2].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[5].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[8].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[2].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[5].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[8].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // from left to right
            createPages.gameBoardArray[0].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[8].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[0].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[8].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if( // from right to left
            createPages.gameBoardArray[2].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'X' &&
            createPages.gameBoardArray[6].firstElementChild.className === 'X'
        ) {
            console.log('player 1 wins')
            return
        } else if(
            createPages.gameBoardArray[2].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[4].firstElementChild.className === 'O' &&
            createPages.gameBoardArray[6].firstElementChild.className === 'O'
        ) {
            console.log('palyer 2 wins')
            return
        } else if (checkDraw) {
            console.log('draw');
        }

    } 
    
    const clickTile = (e) => {
        // function for clicking tile gets executed whenever a tile is clicked
        // adds x- and o-symbols if tile does not have a symbol
        // calls function to see if one player has won
         

        // function passes clicked on tile to check for child function
        const idCurrEle = e.target.id;

        // console.log(idCurrEle)
        // console.log(typeof(idCurrEle))
        const currEle = document.getElementById(idCurrEle);

        //console.log(currEle.firstElementChild.className)
        //markPlayerTurn();

        // check if firstElementChild has already been marked by one of the players
        if (
            currEle.firstElementChild.className === 'X' ||
            currEle.firstElementChild.className === 'O' 
            ) {
        
            // test
            console.log('tile is marked by palyers')
            return;
        } else if(gameFlow.whoTurn.turn === 'player1') {
            // test
            //console.log('player one turn');
            //console.log('does not have child');

            // mark player-1 and clear player-2 before new mark is set 
            gameFlow.markTrnPlyr1();
            
            // select img element and link it the x.svg in the images folder
            const symX = document.querySelector(`.${idCurrEle}`);
            //console.log(symX)
            symX.setAttribute('src','images/x.svg'); 
            symX.setAttribute('id', idCurrEle);
            symX.setAttribute('class', 'X'); 
            currEle.appendChild(symX);
            // give initiative to player 2
            gameFlow.whoTurn.turn = 'player2';

            // mark player-2 and clear player-1 after new mark was set
            gameFlow.markTrnPlyr2();

            // test
            //console.log(gameFlow.whoTurn.turn);
        } else if(gameFlow.whoTurn.turn === 'player2') {

            // mark player-2 and clear player-1 before new mark is set
            gameFlow.markTrnPlyr2();

            const symO = document.querySelector(`.${idCurrEle}`);
            symO.setAttribute('src','images/o.svg'); 
            symO.setAttribute('id', idCurrEle);
            symO.setAttribute('class', 'O');
            currEle.appendChild(symO);
            // give initiative to player 2
            gameFlow.whoTurn.turn = 'player1';

            // mark player-1 and clear player-2 after new mark was set
            gameFlow.markTrnPlyr1();
        };
        
        // check if someone has won
        checkWinConditions();
    }


    return {
        clickTile, markTrnPlyr1, markTrnPlyr2, checkWinConditions, 
        whoTurn, player1, player2,
    }
})();

//console.log(createPages.gameBoardArray)
//console.log(gameFlow.checkDraw)

//console.log(gameFlow.player1)