import * as utils from "./utils";
import { height, width } from "./const";

export function sideCollides(landed, next) {
  // hits right wall
  if (next.some(coords => coords[1] > width - 1)) {
    return true;
  }
  // hits left wall
  if (next.some(coords => coords[1] < 0)) {
    console.log("left crash!");
    return true;
  }
  // hits a landed block
  if (utils.hasIntersectingTouples(landed, next)) {
    console.log("landed crash");
    return true;
  }
  return false;
}

export function downCollides(landed, next) {
  // hits floor
  if (next.some(coords => coords[0] === height)) {
    return true;
  }

  // hits a landed block

  console.log(landed, next);
  if (utils.hasIntersectingTouples(landed, next)) {
    console.log("landed crash");
    return true;
  }

  return false;
}
