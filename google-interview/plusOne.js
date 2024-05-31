
/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = digits => {
  let carry = 1;
  for (let i = digits.length - 1; i >= 0; --i) {
    digits[i] += carry;
    carry = 0;
    if (digits[i] < 10) break;
    digits[i] -= 10;
    carry = 1;
  }
  if (carry) digits.unshift(1);
  return digits;
};

plusOne([4,3,2,1]);
plusOne([9]);
