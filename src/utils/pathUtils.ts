import appRootPath from 'app-root-path';

const patterns = [
  {
    find: /\{APP_ROOT\}/g,
    replace: appRootPath.path,
  },
];

export function getRealPath(path) {
  if (!path) {
    return path;
  }
  let result = path;
  for (const pattern of patterns) {
    result = result.replace(pattern.find, pattern.replace);
  }
  return result;
}
