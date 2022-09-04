
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
        sbtBtn.addEventListener('click',createPages.createPlayers);
        divSbtBtn.appendChild(sbtBtn);

        // test        
        //console.log('LOl')
    }

    const createPlayers = () => {
        // player objects live in this function i need to check if they are 
        // still there when

        // form validation
        const inputPlyr1 = document.getElementById('name-p1').value;
        const inputPlyr2 = document.getElementById('name-p2').value;

        if (inputPlyr1 === '') {
            return;
        } else if (inputPlyr2 === '') {
            return
        }

        //console.log(inputPlyr1)
        // create player objects
        const player1 = createPlayer(inputPlyr1, 0);
        const player2 = createPlayer(inputPlyr2, 0);
        
        // test
        //console.log(player1)

        // add name dispaly and game score
        const divMainTitle = document.createElement('div');
        divMainTitle.setAttribute('class', 'main-title-container');
        mainContainer.appendChild(divMainTitle);
        // player 1
        const divPlayer1 = document.createElement('div');
        divPlayer1.setAttribute('class', 'display-player-1');
        divPlayer1.textContent = `${player1.name} has ${player1.wins} wins.`;
        divMainTitle.appendChild(divPlayer1);
        // player 2
        const divPlayer2 = document.createElement('div');
        divPlayer2.setAttribute('class', 'display-player-2');
        divPlayer2.textContent = `${player2.name} has ${player2.wins} wins.`;
        divMainTitle.appendChild(divPlayer2);


        createBoard();
        return {player1:player1, player2:player2};
    }

    const createBoard = () => {
        // test
        //console.log('lol game Board');
        // delete name submit form
        dltChildNode('.form-players');
 
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
        gameBoardArray.push(tile);
        i++;
        }
    }
    return {
        createStartBtn,  createPlayerForm, createBoard, 
        createPlayers, gameBoardArray
    }
})();

const createPlayer = (name, wins) => {
    // create palyers to store win count and palyer name
    return {name, wins};
}

const gameFlow = (()=> {
    // start button gets created, players will be able to choose in a second 
    // implementation if they want to play pvp or pve
    // after chossing pvp players will be able to enter their names
    // after entering their names the game will start
    createPages.createStartBtn();

    // keep track of who's turn it is
    // player 1 always starts
    const whoTurn = {turn: 'player1'}

    const checkWinConditions = () => {
        // function that check if player has won
        console.log('Who wins')
        console.log(createPages.gameBoardArray)
        console.log(createPages.gameBoardArray[0]);
        const test = createPages.gameBoardArray[0].id
        console.log('parent id ' + test);
        const test2 = createPages.gameBoardArray[0].firstElementChild.className
        console.log('child class ' + test2)



    }
    
    const clickTile = (e) => {
        // function for clicking tile
        // adds x- and o-symbols if tile does not have a symbol
        // calls function to see if one player has won
         

        // function passes clicked on tile to check for child function
        const idCurrEle = e.target.id;
        //console.log(idCurrEle)
        const currEle = document.getElementById(idCurrEle);

        // check if current element has child
        if (currEle.hasChildNodes()) {
            // test
            //console.log('has child')
            return;
        } else if(gameFlow.whoTurn.turn === 'player1') {
            // test
            //console.log('player one turn');
            //console.log('does not have child');
            
            // set x symbol
            const symX = document.createElement('img');
            symX.setAttribute('src','/images/x.svg'); 
            symX.setAttribute('id', idCurrEle);
            symX.setAttribute('class', 'X'); 
            currEle.appendChild(symX);
            // give initiative to player 2
            gameFlow.whoTurn.turn = 'player2';
            // test
            //console.log(gameFlow.whoTurn.turn);
        } else if(gameFlow.whoTurn.turn === 'player2') {
            const symO = document.createElement('img');
            symO.setAttribute('src','/images/o.svg'); 
            symO.setAttribute('id', idCurrEle);
            symO.setAttribute('id', 'O');
            currEle.appendChild(symO);
            // give initiative to player 2
            gameFlow.whoTurn.turn = 'player1';
        };
        checkWinConditions();
    }


    return {clickTile, whoTurn, checkWinConditions}
})();

//console.log(createPages.gameBoardArray)