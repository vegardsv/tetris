const tetrominos = [
  [[0.5, 4.5], [0, 3], [0, 4], [0, 5], [0, 6]],
  [[0.5, 4.5], [0, 4], [0, 5], [1, 4], [1, 5]],
  [[0, 5], [0, 4], [0, 5], [0, 6], [-1, 5]],
  [[0, 5], [0, 4], [0, 5], [0, 6], [-1, 4]],
  [[0, 5], [0, 4], [0, 5], [0, 6], [-1, 6]],
  [[0, 5], [0, 5], [0, 6], [-1, 4], [-1, 5]],
  [[0, 5], [0, 4], [0, 5], [-1, 5], [-1, 6]]
];

// https://tetris.fandom.com/wiki/Random_Generator

/*
The Random Generator is BPS's name for the algorithm used to generate the
sequence of tetrominoes in Tetris brand games that follow the Tetris Guideline.

Random Generator generates a sequence of all seven one-sided tetrominoes 
(I, J, L, O, S, T, Z) permuted randomly, as if they were drawn from a bag. 
Then it deals all seven tetrominoes to the piece sequence before generating 
another bag. There are 7!, or 5,040, permutations of seven elements, and it is 
believed that Tetris assigns a nearly equal probability to each of these,
making it much less likely that the player will get an obscenely long run without
a desired tetromino. It can produce a maximum of 12 tetrominoes between one 
I and the next I, and a run of S and Z tetrominoes is limited to a maximum 
of 4. Exception: In Random Generator as implemented in Tetris The Grand Master
Ace, the first piece of the first bag is always I, J, L, or T, just as in the 
traditional TGM randomizer.
*/

export function* randomGenerator() {
  let current = shuffle([...tetrominos]);
  let num = 0;
  while (true) {
    yield current[num];
    if (num == current.length - 1) {
      num = 0;
      current = shuffle([...tetrominos]);
    } else {
      num = num + 1;
    }
  }
}

// Fisher-Yates Shuffle
function shuffle(array) {
  console.log(array);
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
