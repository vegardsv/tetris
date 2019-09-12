import * as utils from "./utils";
import { height, width, tetrominos, emptyPlayfieldCell } from "./const";
import { sideCollides, downCollides } from "./collision";

let falling = utils.randomIndex(tetrominos);
let landed = [];
render();

document.body.onkeydown = e => {
  if (e.keyCode === 37) {
    const next = falling.map(utils.moveLeft);
    if (!sideCollides(landed, utils.tail(next))) {
      falling = next;
    }
  }
  if (e.keyCode === 39) {
    const next = falling.map(utils.moveRight);
    if (!sideCollides(landed, utils.tail(next))) {
      falling = next;
    }
  }

  if (e.keyCode === 40) {
    const next = falling.map(utils.moveDown);
    if (!downCollides(landed, next)) {
      falling = next;
    } else {
      landed = landed.concat(falling);
      falling = utils.randomIndex(tetrominos);
    }
  }

  // Up arrow and X are to rotate 90° clockwise.
  if (e.keyCode === 38) {
    const [center, ...coords] = falling;
    falling = [
      center,
      ...coords
        .map(x => utils.rotate(center[0], center[1], x[0], x[1]))
        .map(x => [Math.floor(x[0]), Math.floor(x[1])])
    ];
  }

  // Hard drop
  if (e.keyCode === 32) {
    let dropped = false;
    while (!dropped) {
      const next = falling.map(utils.moveDown);
      if (!downCollides(landed, next)) {
        falling = next;
      } else {
        dropped = true;
        landed = landed.concat(falling);
        falling = utils.randomIndex(tetrominos);
      }
    }
  }
  render();
};

setInterval(function() {
  const next = falling.map(utils.moveDown);
  if (!downCollides(landed, next)) {
    falling = next;
  } else {
    landed = landed.concat(falling);
    falling = utils.randomIndex(tetrominos);
  }
  render();
}, 1000);

function render() {
  document.body.innerHTML =
    "<pre>" +
    utils.range(height).reduce(
      (acc, _, i) =>
        acc +
        "\n" +
        utils.range(width).reduce((acc, _, j) => {
          if (
            utils.tail(falling).some(x => utils.equal([i, j], x)) ||
            landed.some(x => utils.equal([i, j], x))
          ) {
            return acc + "#";
          } else {
            return acc + emptyPlayfieldCell;
          }
        }, ""),
      ""
    );
}
