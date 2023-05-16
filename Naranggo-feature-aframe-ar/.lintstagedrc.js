module.exports = {
  'apps/**/*.{ts,tsx,js,jsx}': [
    'nx affected:lint --fix --files',
    'nx format:write --files'
  ],
  'libs/**/*.{ts,tsx,js,jsx}': [
    'nx affected:lint --fix --files',
    'nx format:write --files'
  ]
};
