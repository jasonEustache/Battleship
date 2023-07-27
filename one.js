var readlineSync = require("readline-sync");

function pushToArray(gameContent) {
  let gameBoard = [];
  for (let i = 0; i < gameContent.length; i++) {
    gameBoard.push(gameContent[i]);
  }
  return gameBoard;
}

function pushToArray(gameContentA, gameContentB, gameContentC, gameContentD) {
  let gameBoard = [gameContentA, gameContentB, gameContentC, gameContentD];
  return gameBoard;
}

let gameContentA = [
  { hit: false, ship: false, location: "A1", userSelectCounter: 0 },
  { hit: false, ship: false, location: "A2", userSelectCounter: 0 },
  { hit: false, ship: false, location: "A3", userSelectCounter: 0 },
];

let gameContentB = [
  { hit: false, ship: false, location: "B1", userSelectCounter: 0 },
  { hit: false, ship: false, location: "B2", userSelectCounter: 0 },
  { hit: false, ship: false, location: "B3", userSelectCounter: 0 },
];

let gameContentC = [
  { hit: false, ship: false, location: "C1", userSelectCounter: 0 },
  { hit: false, ship: false, location: "C2", userSelectCounter: 0 },
  { hit: false, ship: false, location: "C3", userSelectCounter: 0 },
];
//////////
let gameContentD = [{ counter: 2 }];
//////////
function rowSelection(gameBoard) {
  return gameBoard[Math.floor(Math.random() * 3)];
}

/////////////////////

function theBattleShipGame() {
  let gameBoard;

  gameBoard = pushToArray(
    gameContentA,
    gameContentB,
    gameContentC,
    gameContentD
  );

  let rowLocation1 = rowSelection(gameBoard);
  let rowLocation2 = rowSelection(gameBoard);

  if (rowLocation1 === rowLocation2) {
    while (rowLocation1 === rowLocation2) {
      rowLocation1 = rowSelection(gameBoard);
      rowLocation2 = rowSelection(gameBoard);
    }
  }

  let colLocation1 = rowLocation1[Math.floor(Math.random() * 3)];
  let colLocation2 = rowLocation2[Math.floor(Math.random() * 3)];

  colLocation1.ship = true;
  colLocation2.ship = true;

  var start = readlineSync.question("Press any key to start the game.");

  start = true;

  while (start) {
    console.log(gameBoard);
    var location = readlineSync.question("Enter a location to strike ");
    ////
    for (let row = 0; row < gameBoard.length; row++) {
      ///
      for (let col = 0; col < gameBoard[row].length; col++) {
        /////
        if (gameBoard[row][col].location === location) {
          if (gameBoard[row][col].userSelectCounter > 0) {
            console.log("You have already picked this location");
          }

          if (gameBoard[row][col].ship === false) {
            gameBoard[row][col].hit = true;
            gameBoard[row][col].userSelectCounter++;
            console.log("You have missed!");
          }

          if (gameBoard[row][col].ship === true) {
            gameBoard[row][col].hit = true;
            gameBoard[row][col].ship = false;
            gameBoard[row][col].userSelectCounter++;
            gameBoard[3][0].counter--;
            console.log(
              `Hit. You have sunk a battleship. ${gameBoard[3][0].counter} ship remaining.`
            );
          }

          if (gameBoard[3][0].counter === 0) {
            start = false;
          }
        }
      }
      /////
    }
    ////
  }

  var completed = readlineSync.keyInYNStrict(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  if (completed) {
    for (let row = 0; row < gameBoard.length; row++) {
      ///
      for (let col = 0; col < gameBoard[row].length; col++) {
        /////

        if (gameBoard[3][0] === gameBoard[row][col]) {
          gameBoard[3][0].counter = 2;
        } else {
          gameBoard[row][col].userSelectCounter = 0;
          gameBoard[row][col].hit = false;
          gameBoard[row][col].ship = false;
          start = true;
        }
      }
    }
    theBattleShipGame();
  }
  /////
}

theBattleShipGame();
