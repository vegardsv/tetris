export const moveDown = t => [t[0] + 1, t[1]];
export const moveRight = t => [t[0], t[1] + 1];
export const moveLeft = t => [t[0], t[1] - 1];

export function range(n) {
  return [...Array(n).keys()];
}

export function head(xs) {
  return xs[0];
}

export function tail(xs) {
  return xs.slice(1);
}

export function last(xs) {
  return xs[xs.length];
}

export function equal(x, y) {
  return x[0] === y[0] && x[1] === y[1];
}

export function randomIndex(xs) {
  return xs[Math.floor(Math.random() * xs.length)];
}

export function itterate(x) {
  return x + 1;
}

export function decrement(x) {
  return x - 1;
}

export function applyToHead(fn, xs) {
  return [fn(head), ...xs];
}

export function applyToLast(fn, xs) {
  return xs
    .reverse()
    .applyToHead(fn)
    .reverse();
}

export function hasIntersectingTouples(xs, ys) {
  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < ys.length; j++) {
      if (equal(xs[i], ys[j])) {
        return true;
      }
    }
  }
  return false;
}

export function rotate(cx, cy, x, y) {
  var radians = (Math.PI / 180) * 90;
  return [
    Math.cos(radians) * (x - cx) + Math.sin(radians) * (y - cy) + cx,
    Math.cos(radians) * (y - cy) - Math.sin(radians) * (x - cx) + cy
  ].map(Math.ceil);
}
