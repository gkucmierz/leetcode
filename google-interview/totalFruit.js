
/**
 * @param {number[]} fruits
 * @return {number}
 */
const totalFruit = fruits => {
  const map = new Map();
  let cnt = 0;
  let [p0, p1] = [0, 0];
  const update = (fruit, q = 1) => {
    const cnt = (map.get(fruit) ?? 0) + q;
    map.set(fruit, cnt);
    return cnt;
  };
  let max = 0;
  while (p0 < fruits.length && p1 < fruits.length) {
    if (cnt <= 2) {
      const fruit = fruits[p1++];
      if (update(fruit, 1) === 1) cnt++;
      if (cnt <= 2) {
        const diff = p1 - p0;
        if (diff > max) max = diff;
      }
    } else {
      const fruit = fruits[p0++];
      if (update(fruit, -1) === 0) cnt--;
    }
  }
  return max;
};

totalFruit([1,2,1]); // 3
totalFruit([0,1,2,2]); // 3
totalFruit([1,2,3,2,2]); // 4
totalFruit([3,3,3,1,2,1,1,2,3,3,4]); // 5
