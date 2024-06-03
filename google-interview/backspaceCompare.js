
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const backspaceCompare = (s, t) => {
  const clean = str => {
    let last;
    while (last !== str) {
      last = str;
      str = str.replace(/(\w#)|(^#+)/g, a => '');
    }
    return str
  };
  return clean(s) === clean(t);
};

backspaceCompare("ab#c", "ad#c");
backspaceCompare("ab##", "c#d#");
backspaceCompare("a#c", "b");
