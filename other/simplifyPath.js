
/**
 * @param {string} path
 * @return {string}
 */
const simplifyPath = path => {
  const stack = [];
  path.match(/([^\/]*\/)|(.+$)/g).map(level => {
    const arr = level.split('/');
    if (arr[0] === '.') {
    } else if (arr[0] === '..') {
      if (stack.length > 1) stack.pop();
    } else {
      if (arr[0] !== '' || stack.length === 0) {
        stack.push(`${arr[0]}/`);
      }
    }
  });
  return stack.join('').replace(/\/$/, '') || '/';
};

simplifyPath("/home/"); // "/home"
simplifyPath("/home//foo/"); // "/home/foo"
simplifyPath("/home/user/Documents/../Pictures"); // "/home/user/Pictures"
simplifyPath("/../"); // "/"
simplifyPath("/.../a/../b/c/../d/./"); // "/.../b/d"
simplifyPath("/../"); // "/"
simplifyPath("/a/../../b/../c//.//"); // '/c'
