import * as utils from "./utils";
import { height, width, tetrominos } from "./const";
import { sideCollides, downCollides } from "./collision";

let falling = utils.randomIndex(tetrominos);
let landed = [];

render();

document.body.onkeydown = e => {
  if (e.keyCode === 37) {
    const next = falling.map(utils.moveLeft);
    if (!sideCollides(landed, next)) {
      falling = next;
    }
  }
  if (e.keyCode === 39) {
    const next = falling.map(utils.moveRight);
    if (!sideCollides(landed, next)) {
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

  if (e.keyCode === 38) {
    const [center, ...coords] = falling;
    falling = [
      center,
      ...coords
        .map(x => utils.rotate(center[0], center[1], x[0], x[1]))
        .map(x => [Math.floor(x[0]), Math.floor(x[1])])
    ];
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
      (acc, cur, i) =>
        acc +
        "\n" +
        utils.range(width).reduce((acc, cur, j) => {
          if (
            utils.tail(falling).some(x => utils.equal([i, j], x)) ||
            landed.some(x => utils.equal([i, j], x))
          ) {
            return acc + "#";
          } else {
            return acc + ".";
          }
        }, ""),
      ""
    );
}
