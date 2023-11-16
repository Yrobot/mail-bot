/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm", // step []: will update the version of 'package.json' // https://github.com/semantic-release/npm
      {
        npmPublish: false,
      },
    ],
    "@semantic-release/git",
    "@semantic-release/github",
  ],
};
