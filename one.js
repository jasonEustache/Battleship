var readlineSync = require("readline-sync");

function rowSelection(gameBoard) {
  return gameBoard[Math.floor(Math.random() * 3)];
}

let num = [1, 2, 3];

let letters = ["A", "B", "C"];

let shipBuild = (letters) => {
  return letters.map((char) => {
    let ship = num.map((obj) => {
      return {
        ship: false,
        userSelectCounter: 0,
        hit: false,
        location: `${char}${obj}`,
      };
    });
    return ship;
  });
};

//intake the variable your working with
function shipCallBack(gameBoard, row, col) {
  return gameBoard[row][col].ship;
}
function userSelectCounterCallBack(gameBoard, row, col) {
  return gameBoard[row][col].userSelectCounter;
}
function hitCallBack(gameBoard, row, col) {
  return gameBoard[row][col].hit;
}
function locationCallBack(gameBoard, row, col) {
  return gameBoard[row][col].location;
}
function counterCallBack(gameBoard) {
  return gameBoard[3].counter;
}
function counterRowCallBack(gameBoard) {
  return gameBoard[3];
}

function UserSelectsSameLocation(gameBoard, row, col) {
  if (userSelectCounterCallBack(gameBoard, row, col) > 0) {
    console.log("You have already picked this location");
  }
}

function userMisses(gameBoard, row, col) {
  if (shipCallBack(gameBoard, row, col) === false) {
    gameBoard[row][col].hit = true;
    gameBoard[row][col].userSelectCounter++;
    console.log("You have missed!");
  }
}

function userHits(gameBoard, row, col) {
  if (shipCallBack(gameBoard, row, col) === true) {
    gameBoard[row][col].hit = true;
    gameBoard[row][col].ship = false;
    gameBoard[row][col].userSelectCounter++;
    gameBoard[3].counter--;
    console.log(
      `Hit. You have sunk a battleship. ${gameBoard[3].counter} ship remaining.`
    );
  }
}

function loopBreak(gameBoard, counterCallBack) {
  if (counterCallBack(gameBoard) === 0) {
    start = false;
  }
}

function resetGameUpdates(gameBoard, row, col) {
  gameBoard[3].counter = 2;
  gameBoard[row][col].userSelectCounter = 0;
  gameBoard[row][col].hit = false;
  gameBoard[row][col].ship = false;
  start = true;
}

function theBattleShipGame() {
  let gameBoard = shipBuild(letters);

  gameBoard.push({ counter: 2 });

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

  let start = readlineSync.question("Press any key to start the game.");

  start = true;

  while (start) {
    console.log(gameBoard);
    let location = readlineSync.question("Enter a location to strike ");

    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        if (locationCallBack(gameBoard, row, col) === location) {
          UserSelectsSameLocation(gameBoard, row, col);

          userMisses(gameBoard, row, col);

          userHits(gameBoard, row, col);

          if (counterCallBack(gameBoard) === 0) {
            start = false;
          }
        }
      }
    }
  }

  let completed = readlineSync.keyInYNStrict(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  if (completed) {
    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        resetGameUpdates(gameBoard, row, col);
      }
    }
  }
  theBattleShipGame();
}

theBattleShipGame();
