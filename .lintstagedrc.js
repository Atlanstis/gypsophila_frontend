/** @type {import('lint-staged').Config} */
export default {
  '*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}': ['eslint --fix', 'prettier --write'],
  '*.{css,scss,html,json,md}': ['prettier --write'],
};
