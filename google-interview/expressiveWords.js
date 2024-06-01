
/**
 * @param {string} S
 * @param {string[]} words
 * @return {number}
 */
const expressiveWords = (s, words) => {
  const re = new RegExp([
    '^',
    s.replace(/(.)\1{2,}/g, (a, b) => `${b}{1,${a.length}}`),
    '$'
  ].join(''));
  return words.filter(word => re.test(word)).length;
};

expressiveWords('heeellooo', ['hello', 'hi', 'helo']);
expressiveWords('zzzzzyyyyy', ['zzyy','zy','zyy']);
expressiveWords(
  'dddiiiinnssssssoooo', 
  ["dinnssoo","ddinso","ddiinnso","ddiinnssoo","ddiinso",
   "dinsoo","ddiinsso","dinssoo","dinso"]
);
