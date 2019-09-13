import * as utils from "./utils";
import { sideCollides, downCollides } from "./collision";
import { randomGenerator } from "./randomGenerator";

export function run(renderFunction) {
  const tetrominosGenerator = randomGenerator();
  let state = { falling: tetrominosGenerator.next().value, landed: [] };
  let falling = tetrominosGenerator.next().value;

  document.body.onkeydown = e => {
    if (e.keyCode === 37) {
      const next = state.falling.map(utils.moveLeft);
      if (!sideCollides(state.landed, utils.tail(next))) {
        state.falling = next;
      }
    }
    if (e.keyCode === 39) {
      const next = state.falling.map(utils.moveRight);
      if (!sideCollides(state.landed, utils.tail(next))) {
        state.falling = next;
      }
    }

    if (e.keyCode === 40) {
      const next = state.falling.map(utils.moveDown);
      if (!downCollides(state.landed, next)) {
        state.falling = next;
      } else {
        state.landed = state.landed.concat(falling);
        state.falling = tetrominosGenerator.next().value;
      }
    }

    // Up arrow and X are to rotate 90° clockwise.
    if (e.keyCode === 38) {
      const [center, ...coords] = falling;
      state.falling = [
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
        const next = state.falling.map(utils.moveDown);
        if (!downCollides(state.landed, next)) {
          state.falling = next;
        } else {
          dropped = true;
          state.landed = state.landed.concat(state.falling);
          state.falling = tetrominosGenerator.next().value;
        }
      }
    }
    render();
  };

  setInterval(function() {
    const next = falling.map(utils.moveDown);
    if (!downCollides(state.landed, next)) {
      state.falling = next;
    } else {
      state.landed = state.landed.concat(falling);
      state.falling = randomGenerator().next().value;
    }
    render();
  }, 1000);

  function render() {
    renderFunction(state);
  }
}
