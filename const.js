// standard width of playing field
export const width = 10;

// Height of playing field
export const height = 20;

// The 6 standard tetrominos
// First touple represents the rotation center of a piece,
export const tetrominos = [
  [[0.5, 4.5], [0, 3], [0, 4], [0, 5], [0, 6]],
  [[0.5, 4.5], [0, 4], [0, 5], [1, 4], [1, 5]],
  [[0, 5], [0, 4], [0, 5], [0, 6], [-1, 5]],
  [[0, 5], [0, 4], [0, 5], [0, 6], [-1, 4]],
  [[0, 5], [0, 4], [0, 5], [0, 6], [-1, 6]],
  [[0, 5], [0, 5], [0, 6], [-1, 4], [-1, 5]],
  [[0, 5], [0, 4], [0, 5], [-1, 5], [-1, 6]]
];

export const emptyPlayfieldCell = ".";
