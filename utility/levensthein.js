let levenshtein_ratio = (string_1, string_2) => {
  rows = string_1.length + 1;
  cols = string_2.length + 1;
  distance = zeros([rows, cols]);
  let ratio = 0;
  let cost = 0;
  for (let i = 1; i < rows; i++) {
    for (let k = 1; k < cols; k++) {
      distance[i][0] = i;
      distance[0][k] = k;
    }
  }
  for (let col = 1; col < cols; col++) {
    for (let row = 1; row < rows; row++) {
      if (string_1[row - 1] === string_2[col - 1]) {
        cost = 1;
      } else {
        cost = 2;
      }

      distance[row][col] = Math.min(
        distance[row - 1][col] + 1,
        distance[row][col - 1] + 1,
        distance[row - 1][col - 1] + cost
      );
      ratio =
        (string_1.length + string_2.length - distance[row][col]) /
        (string_1.length + string_2.length);
    }
  }

  return ratio * 2.0;
};
let zeros = (dimensions) => {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
};

module.exports = levenshtein_ratio;