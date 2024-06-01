/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = s => {
  const type = {
    '(': 1, ')': -1,
    '[': 2, ']': -2,
    '{': 3, '}': -3,
  };
  const stack = [];
  for (const char of s) {
    const open = (char in type) && type[char] > 0;
    if (open) {
      stack.push(type[char]);
    } else {
      const last = stack.pop();
      if (last !== -type[char]) return false;
    }
  }
  return stack.length === 0;
};

isValid("()"); // true
isValid("()[]{}"); // true
isValid("(]"); // false
