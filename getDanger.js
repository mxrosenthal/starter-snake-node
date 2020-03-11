const { getOccupiedSquares } = require('./getOpenSquares');

const getDanger = (body, directions, possibleSquares) => {
  const headMultiplier = 3;
  // heads of other snakes (not including our own)
  let heads = body.board.snakes
    .map(snake => snake.body[0])
    .filter(
      head => head.x !== body.you.body[0].x || head.y !== body.you.body[0].y
    );

  possibleSquares.forEach((bool, i) => {
    if (!bool) return;
    let danger = 0;

    //stepped square becomes one of the next possible squares to move into.
    let steppedSquare = getStep(i, body.you.body[0]);

    //danger will be higher for moves that go towards snake heads.
    heads.forEach(head => {
      danger += headMultiplier / getRadialDistance(head, steppedSquare);
    });

    //adding danger ranking to the final object in the directions array
    directions[i].danger = danger;
    directions[i].danger += blockDanger(body, steppedSquare, 2);
    console.log(directions[i], body.turn);
  });
  return directions;
};

const getRadialDistance = (square1, square2) => {
  return Math.sqrt((square1.x - square2.x) ** 2 + (square1.y - square2.y) ** 2);
};

const listHasSquare = (testSquare, squaresList) => {
  for (const square of squaresList) {
    if (square.x === testSquare.x && square.y === testSquare.y) {
      return true;
    }
  }
  return false;
};

const blockDanger = (info, steppedSquare, n) => {
  let blockDanger = 0;
  const takenSquares = getOccupiedSquares(info).map(obj => JSON.parse(obj));

  //from each square you could potentially step into, check the surrounding squares for danger
  //and augment the danger ranking based on this.
  for (let i = steppedSquare.x - n; i <= steppedSquare.x + n; i++) {
    for (let j = steppedSquare.y - n; j <= steppedSquare.y + n; j++) {
      if (j > info.board.height || j < 0 || i > info.board.width || i < 0) {
        blockDanger += 1 / getRadialDistance({ x: i, y: j }, steppedSquare);
      } else if (listHasSquare({ x: i, y: j }, takenSquares)) {
        blockDanger += 1 / getRadialDistance({ x: i, y: j }, steppedSquare);
        console.log(`blockdanger after square ${i}, ${j}: ${blockDanger}`);
      }
    }
  }
  return blockDanger;
};

//take in position and direction, return square travelled to
const getStep = (direction, location) => {
  if (direction === 0) {
    //up
    return { ...location, y: location.y - 1 };
  }
  if (direction === 2) {
    //down
    return { ...location, y: location.y + 1 };
  }
  if (direction === 1) {
    //right
    return { ...location, x: location.x + 1 };
  }
  if (direction === 3) {
    //left
    return { ...location, x: location.x - 1 };
  }
};

module.exports = getDanger;
