export function levenshtein_ratio(string_1: string, string_2: string);number{
  const rows: number = string_1.length + 1;
  const cols: number = string_2.length + 1;
  let distance: Array<any> = zeros([rows, cols]);
  let ratio: number = 0;
  let cost: number = 0;
  for (let i: number = 1; i < rows; i++) {
    for (let k: number = 1; k < cols; k++) {
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
function zeros(dimensions: Array<number>): Array<number> {
  let array: Array<any> = [];
  for (var i = 0; i < dimensions[0]; ++i) {
    array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
};
