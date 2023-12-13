var readlineSync = require("readline-sync");
const letters = "abcdefghij".toLocaleUpperCase().split("");

const gameBoardBuild = () => {
  const letters = "abcdefghij".toLocaleUpperCase().split("");
  let gameBoard = [];
  let letterLoop = letters.map((character) => {
    let list = [];
    for (let index = 1; index < letters.length + 1; index++) {
      let characterNumber = `${character}${index}`;
      list.push(characterNumber);
    }
    gameBoard.push(list);
  });
  return gameBoard;
};

const directionAndRandomCoord = (max) => {
  let randomDirection = Math.floor(Math.random() * max);
  if (randomDirection === 0) {
    return directionAndRandomCoord(max);
  }
  return randomDirection;
};

//returns a array
let coordinateSelection = (ship) => {
  const direction = 3;
  const randomDirection = directionAndRandomCoord(direction);
  let letter = directionAndRandomCoord(letters.length);
  let number = directionAndRandomCoord(letters.length);
  const ships = [];
  const firstChord = `${letters[letter]}${number}`;
  ships.push(firstChord);

  for (let index = 1; index < ship.unit; index++) {
    let horizontal = `${letters[letter]}${number + index}`;

    let vert = `${letters[letter + index]}${number}`;

    let condition = number + index >= 10 || letter + index >= 10;

    if (condition) {
      return coordinateSelection(ship);
    }

    if (randomDirection === 1) {
      ships.push(horizontal);
    } else {
      ships.push(vert);
    }
  }
  return ships;
};

let ships = [
  { ship: "Battle", unit: 2 },
  { ship: "crew", unit: 3 },
  { ship: "sailboat", unit: 3 },
  { ship: "submarine", unit: 4 },
  { ship: "attack", unit: 5 },
];

const duplicateSelection = (allShips, listOfCoord) => {
  const same = [];

  let everyShipCoordinate = allShips.flat();
  let selectedGroupOfCoordinates = listOfCoord;

  selectedGroupOfCoordinates.forEach((selected) => {
    if (everyShipCoordinate.includes(selected)) {
      same.push(selected);
    }
  });

  if (same.length > 1) {
    return true;
  } else {
    return false;
  }
};

const everyShipsArray = (ships) => {
  let allShips = [];
  let allShipsArray = [];
  let listOfCoord;
  let shipO;
  ships.forEach((ship) => {
    while (true) {
      listOfCoord = coordinateSelection(ship);
      shipO = { shipList: listOfCoord, name: ship.ship, hit: 0 };
      allShips.push(shipO);
      allShipsArray.push(listOfCoord);
      break;
    }
  });
  let finalCheck = allShipsArray.flat();
  let check = [];

  finalCheck.forEach((coord) => {
    if (!check.includes(coord)) {
      check.push(coord);
    }
  });

  if (check.length !== finalCheck.flat().length) {
    return everyShipsArray(ships);
  } else {
    return [allShips, allShipsArray];
  }
};

const shipListLoop = (shipList) => {
  const shipSelection = [];
  for (let index = 0; index < shipList.flat().length; index++) {
    if (shipList[index] === "X") {
      shipSelection.push(shipList[index]);
    }

    if (shipSelection.length === shipList.flat().length) {
      return false;
    } else {
      return true;
    }
  }
};

const game = () => {
  let gameBoard = gameBoardBuild();

  let everyShipArrayObj = everyShipsArray(ships);
  let everyShipObject = everyShipArrayObj[0];
  let everyShipArray = everyShipArrayObj[1].flat();
  var start = readlineSync.question("Press any key to start the game.");
  let shipCount = 5;
  let coordinateTracker = [];
  start = true;

  while (start) {
    console.table(gameBoard);
    let boardFlat = gameBoard.flat();
    var location = readlineSync.question("Enter a location to strike ");

    if (coordinateTracker.includes(location)) {
      while (coordinateTracker.includes(location)) {
        console.log("This location has already been hit");
        location = readlineSync.question("Enter a location to strike ");
      }
    }

    if (boardFlat.includes(location)) {
      coordinateTracker.push(location);

      if (everyShipArray.includes(location)) {
        for (let one = 0; one < gameBoard.length; one++) {
          for (let two = 0; two < gameBoard[one].length; two++) {
            if (gameBoard[one][two] === location) {
              gameBoard[one][two] = "X";
            }
          }
        }

        for (let one = 0; one < everyShipObject.length; one++) {
          if (everyShipObject[one].shipList.includes(location)) {
            let hit = [];

            for (
              let two = 0;
              two < everyShipObject[one].shipList.length;
              two++
            ) {
              if (everyShipObject[one].shipList[two] === location) {
                everyShipObject[one].shipList[two] = "X";
                everyShipObject[one].hit++;
                console.log(`You have hit a ${everyShipObject[one].name} ship`);
              }

              if (everyShipObject[one].shipList[two] === "X") {
                hit.push(everyShipObject[one].shipList[two]);
                if (hit.length === everyShipObject[one].shipList.length) {
                  shipCount--;
                  console.log(
                    `you have sunk a ${everyShipObject[one].name} ship ${shipCount} ships remaining`
                  );
                }
              }
            }
          }
        }

        for (let one = 0; one < everyShipArray.length; one++) {
          if (everyShipArray[one] === location) {
            everyShipArray[one] = "X";
          }
        }
      } else {
        for (let one = 0; one < gameBoard.length; one++) {
          for (let two = 0; two < gameBoard[one].length; two++) {
            if (gameBoard[one][two] === location) {
              gameBoard[one][two] = "O";
              console.log("You have missed");
            }
          }
        }
      }
    } else {
      console.log("This is not vaild location");
    }

    if (shipCount === 0) {
      start = false;
      break;
    }
  }

  var completed = readlineSync.keyInYNStrict(
    "You have destroyed all battleships. Would you like to play again? Y/N"
  );
  if (completed) {
    return game();
  }
};

game();
