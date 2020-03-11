const getOccupiedSquares = function(info) {
  //get snakes on board
  const snakes = info.board.snakes;
  //get your body coords
  const ourSnake = info.you.body;
  let positions = [];
  //loop through snakes on board and their bodies to add filled squares to positions
  for (const snake of snakes) {
    for (const square of snake.body) {
      positions.push(JSON.stringify(square));
    }
  }
  //add coords of your body to positions
  for (const square of ourSnake) {
    positions.push(JSON.stringify(square));
  }
  return positions;
};

// potential upgrade for this function would be to take into consideration if a square is occupied by a tail that will move out of our way
const getOpenSquares = function(info) {
  let openSquares = [true, true, true, true];
  const head = info.you.body[0];
  const filledSquares = getOccupiedSquares(info);

  // get all potential next moves from current position
  const north = { x: head.x, y: head.y - 1 };
  const east = { x: head.x + 1, y: head.y };
  const south = { x: head.x, y: head.y + 1 };
  const west = { x: head.x - 1, y: head.y };
<<<<<<< HEAD
  console.log(south, )
  if (
    JSON.stringify(north) === JSON.stringify(neck) ||
    north.y < 0 ||
    filledSquares.includes(JSON.stringify(north))
  ) {
=======

  // if the square is occupied set value to false for that direction
  if (north.y < 0 || filledSquares.includes(JSON.stringify(north))) {
>>>>>>> 886d462b0ba1fe0aa05f61b5bd48038458d4c1b8
    openSquares[0] = false;
  }
  if (
    east.x > info.board.width - 1 ||
    filledSquares.includes(JSON.stringify(east))
  ) {
    openSquares[1] = false;
  }
  if (
<<<<<<< HEAD
    JSON.stringify(south) === JSON.stringify(neck) ||
    south.y >= info.board.height - 1 ||
=======
    south.y > info.board.height - 1 ||
>>>>>>> 886d462b0ba1fe0aa05f61b5bd48038458d4c1b8
    filledSquares.includes(JSON.stringify(south))
  ) {
    openSquares[2] = false;
  }
  if (west.x < 0 || filledSquares.includes(JSON.stringify(west))) {
    openSquares[3] = false;
  }
  return openSquares;
};

module.exports = {
  getOpenSquares,
  getOccupiedSquares
};
