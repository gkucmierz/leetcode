/**
 * Definition for read4()
 * 
 * @param {character[]} buf Destination buffer
 * @return {number} The number of characters read
 * read4 = function(buf4) {
 *     ...
 * };
 */

/**
 * @param {function} read4()
 * @return {function}
 */
const solution = read4 => {
  const mem = [];
  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return function(buf, n) {
    while (mem.length < n) {
      const read = [];
      const size = read4(read);
      if (size === 0) break;
      mem.splice(mem.length, 0, ...read);
    }
    const chunk = mem.splice(0, n);
    buf.splice(0, 0, ...chunk);
    return chunk.length;
  };
};
