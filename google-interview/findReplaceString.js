/**
 * @param {string} s
 * @param {number[]} indices
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
const findReplaceString = (s, indices, sources, targets) => {
  const arr = [];
  for (let i = 0; i < indices.length; ++i) {
    arr[i] = {
      i: indices[i],
      s: sources[i],
      t: targets[i]
    };
  }
  const res = [s];
  arr.sort((a, b) => b.i - a.i).map(({ i, s, t }) => {
    const first = res[0];
    const idx = first.indexOf(s, i);
    if (idx !== i) return;
    res[0] = first.slice(idx + s.length);
    res.unshift(first.slice(0, idx), t);
  });
  return res.join('');
};

findReplaceString("abcd", [0, 2], ["a", "cd"], ["eee", "ffff"]); // "eeebffff"
findReplaceString("abcd", [0, 2], ["ab","ec"], ["eee","ffff"]); // "eeecd"
findReplaceString("vmokgggqzp",[3,5,1],["kg","ggq","mo"],["s","so","bfr"]); // "vbfrssozp"
