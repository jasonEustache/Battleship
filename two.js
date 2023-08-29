var readlineSync = require("readline-sync");
let num = 10;
let n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

let shipBuild = (letters) => {
  return letters.map((char) => {
    let ship = n.map((obj) => {
      return `${char}${obj}`;
    });
    return ship;
  });
};

let cord;

function gameBoardBuild(num, cord) {
  let A = [],
    B = [],
    C = [],
    D = [],
    E = [],
    F = [],
    G = [],
    H = [],
    I = [],
    J = [];

  let gameBoard = [A, B, C, D, E, F, G, H, I, J];

  cord = [];

  for (
    let i = 0,
      j = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      a = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      f = 0;
    i < num;
    i++
  ) {
    while (f < num) {
      cord.push(`${a[i]}${j[f]}`);
      f++;
    }
    f = 0;
  }

  let arrayOfObj = [];
  let i = 0;

  while (i < 100) {
    obj = {
      ship: false,
      count: 0,
      id: i + 1,
      location: `${cord[i]}`,
    };
    arrayOfObj.push(obj);
    i++;
  }

  for (let index = 0; index < arrayOfObj.length; index++) {
    for (let i = 0; i < arrayOfObj[index].location.length; i++) {
      if (arrayOfObj[index].location[i] === "A") {
        A.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "B") {
        B.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "C") {
        C.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "D") {
        D.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "E") {
        E.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "F") {
        F.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "G") {
        G.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "H") {
        H.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "I") {
        I.push(arrayOfObj[index]);
      }
      if (arrayOfObj[index].location[i] === "J") {
        J.push(arrayOfObj[index]);
      }
    }
  }
  return [gameBoard, cord];
}
let boardX = gameBoardBuild(num);

let gameBoard = gameBoardBuild(num);

cord = boardX[1];

let one = [],
  two = [],
  three = [],
  four = [],
  five = [],
  six = [],
  seven = [],
  eight = [],
  nine = [],
  ten = [];

let boardY = [one, two, three, four, five, six, seven, eight, nine, ten];

for (let i = 0; i < boardX[0].length; i++) {
  for (let index = 0; index < boardX[0][i].length; index++) {
    if (boardX[0][i][index]) {
      if (index === 0) {
        one.push(boardX[0][i][index]);
      }
      if (index === 1) {
        two.push(boardX[0][i][index]);
      }
      if (index === 2) {
        three.push(boardX[0][i][index]);
      } //s
      if (index === 3) {
        four.push(boardX[0][i][index]);
      }
      if (index === 4) {
        five.push(boardX[0][i][index]);
      }
      if (index === 5) {
        six.push(boardX[0][i][index]);
      }
      if (index === 6) {
        seven.push(boardX[0][i][index]);
      }
      if (index === 7) {
        eight.push(boardX[0][i][index]);
      }
      if (index === 8) {
        nine.push(boardX[0][i][index]);
      }
      if (index === 9) {
        ten.push(boardX[0][i][index]);
      }
    }
  }
}

function theBattleShipGame() {
  let randomXYBoard = [boardX[0], boardY];

  function randomBoard(randomXYBoard) {
    randomXYBoard = randomXYBoard[Math.floor(Math.random() * 1)];
    return randomXYBoard;
  }

  let gameBoard = randomBoard(randomXYBoard);

  let randomNum = [];

  for (let index = 0; index < 10; index++) {
    let rdm = Math.floor(Math.random() * 10);
    if (!randomNum.includes(rdm)) {
      randomNum.push(rdm);
    }
  }

  let rows = [];

  while (rows.length !== 5) {
    let r = Math.floor(Math.random() * 10);
    if (!rows.includes(r)) {
      rows.push(r);
    }
  }

  for (let index = 0; index < rows.length; index++) {
    rows[index] = gameBoard[rows[index]];
  }

  let ships = [];

  let shipGroups = [];

  const c1 = Math.floor(Math.random() * 10);
  const c2 = Math.floor(Math.random() * 5);
  const c3 = Math.floor(Math.random() * 4);
  const c4 = Math.floor(Math.random() * 3);
  const c5 = Math.floor(Math.random() * 2);

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0, boat = []; col < rows[row].length; col++) {
      const condition1 = [
        col === 0,
        col === 1,
        col === 2,
        col === 3,
        col === 4,
        col === 5,
        col === 6,
        col === 7,
        col === 8,
        col === 9,
      ];

      if (row === 0 && condition1[c1]) {
        ships.push(rows[row][col]);
        boat = [];
        boat.push(rows[row][col]);
        shipGroups.push(rows[row][col]);
        rows[row][col].name = "saleBoat";
        rows[row][col].ship = true;
      }

      const condition2 = [
        col === 0 || col === 1,
        col === 2 || col === 3,
        col === 4 || col === 5,
        col === 6 || col === 7,
        col === 8 || col === 9,
      ];

      if (row === 1 && condition2[c2]) {
        ships.push(rows[row][col]);
        boat = [];
        boat.push(rows[row][col]);
        shipGroups.push(rows[row][col]);
        rows[row][col].name = "steamBoat";
        rows[row][col].ship = true;
      }

      const condition3 = [
        col === 0 || col === 1 || col === 2,
        col === 3 || col === 4 || col === 5,
        col === 6 || col === 7 || col === 8,
        col === 7 || col === 8 || col === 9,
      ];

      if (row === 2 && condition3[c3]) {
        ships.push(rows[row][col]);
        boat = [];
        boat.push(rows[row][col]);
        shipGroups.push(rows[row][col]);
        rows[row][col].name = "carrier";
        rows[row][col].ship = true;
      }

      const condition4 = [
        col === 0 || col === 1 || col === 2 || col === 3,
        col === 4 || col === 5 || col === 6 || col === 7,
        col === 6 || col === 7 || col === 8 || col === 9,
      ];

      if (row === 3 && condition4[c4]) {
        ships.push(rows[row][col]);
        boat = [];
        boat.push(rows[row][col]);
        shipGroups.push(rows[row][col]);
        rows[row][col].name = "tankBoat";
        rows[row][col].ship = true;
      }

      const condition5 = [
        col === 0 || col === 1 || col === 2 || col === 3 || col === 4,
        col === 5 || col === 6 || col === 7 || col === 8 || col === 9,
      ];

      if (row === 4 && condition5[c5]) {
        ships.push(rows[row][col]);
        boat = [];
        boat.push(rows[row][col]);
        shipGroups.push(rows[row][col]);
        rows[row][col].name = "battleShip";
        rows[row][col].ship = true;
      }
    }
  }

  let shipUnits = (shipGroups) => {
    let boatArray = [];

    let saleBoat = shipGroups.filter((ship) => {
      return ship.name === "saleBoat";
    });

    boatArray.push(saleBoat);

    let steamBoat = shipGroups.filter((ship) => {
      return ship.name === "steamBoat";
    });

    boatArray.push(steamBoat);

    let carrier = shipGroups.filter((ship) => {
      return ship.name === "carrier";
    });

    boatArray.push(carrier);

    let tankBoat = shipGroups.filter((ship) => {
      return ship.name === "tankBoat";
    });

    boatArray.push(tankBoat);

    let battleShip = shipGroups.filter((ship) => {
      return ship.name === "battleShip";
    });

    boatArray.push(battleShip);

    return boatArray;
  };

  var start = readlineSync.question("Press any key to start the game.");

  start = true;

  let unit = 15;
  let counter = 5;

  let userSelect = shipBuild(letters);

  while (start) {
    console.table(userSelect);

    var location = readlineSync.question("Enter a location to strike ");

    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        if (gameBoard[row][col].location === location) {
          if (gameBoard[row][col].count > 0) {
            console.log("You have already picked this location");
          }

          if (gameBoard[row][col].ship === false) {
            for (let r = 0; r < userSelect.length; r++) {
              for (let c = 0; c < userSelect.length; c++) {
                if (userSelect[r] === gameBoard[row][col].location) {
                  userSelect[r] = "O";
                }
                if (userSelect[r][c] === gameBoard[row][col].location) {
                  userSelect[r][c] = "O";
                }
              }
            }

            gameBoard[row][col].hit = true;
            gameBoard[row][col].count++;
            console.log("You have missed!");
          }

          if (gameBoard[row][col].ship === true) {
            for (let r = 0; r < userSelect.length; r++) {
              for (let c = 0; c < userSelect.length; c++) {
                if (userSelect[r] === gameBoard[row][col].location) {
                  userSelect[r] = "X";
                }
                if (userSelect[r][c] === gameBoard[row][col].location) {
                  userSelect[r][c] = "X";
                }
              }
            }

            gameBoard[row][col].hit = true;
            gameBoard[row][col].ship = false;
            gameBoard[row][col].count++;

            unit--;
            console.log(
              `Hit. You have sunk a ${gameBoard[row][col].name} unit.`
            );

            if (unit === 14) {
              counter--;
              console.log(`${counter} ships remaining.`);
            }
            if (unit === 12) {
              counter--;
              console.log(`${counter} ships remaining.`);
            }
            if (unit === 9) {
              counter--;
              console.log(`${counter} ships remaining.`);
            }
            if (unit === 5) {
              counter--;
              console.log(`${counter} ships remaining.`);
            }
            if (unit === 0) {
              counter--;
              console.log(`${counter} ships remaining.`);
            }

            if (counter === 0) {
              start = false;
            }
          }
        }
      }
    }
  }

  var completed = readlineSync.keyInYNStrict(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );

  if (completed) {
    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        counter = 5;
        gameBoard[row][col].counter = 0;
        gameBoard[row][col].hit = false;
        gameBoard[row][col].ship = false;
        start = true;
      }
    }

    for (let index = 0; index < userSelect.length; index++) {
      for (let index = 0; index < cord.length; index++) {
        userSelect[index] = cord[index];
      }
    }
  }
  theBattleShipGame();
}

theBattleShipGame();
