
/**
 * @param {string} s
 * @return {string}
 */
const decodeString = s => {
  const OPEN = '[';
  const CLOSE = ']';
  const isDigit = s => /^\d+$/.test(s);
  let n = '';
  let str = '';
  const stack = [];
  for (const char of s) {
    if (isDigit(char)) {
      n += char;
    } else if (char === OPEN) {
      stack.push({ n, str });
      n = '';
      str = '';
    } else if (char === CLOSE) {
      const s = stack.pop();
      str = s.str + str.repeat(+s.n);
      n = '';
    } else {
      str += char;
    }
  }
  return str;
};

decodeString('3[a]2[bc]'); // "aaabcbc"
decodeString('3[a2[c]]'); // "accaccacc"
decodeString('2[abc]3[cd]ef'); // "abcabccdcdcdef"
