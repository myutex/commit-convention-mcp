/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    'main',
    { name: 'next', prerelease: true },
    { name: 'beta', prerelease: 'beta' },
    { name: 'hotfix/*', prerelease: false },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          { type: 'feat', release: 'minor' },

          { type: 'fix', release: 'patch' },

          { type: 'perf', release: 'patch' },

          { type: 'build', release: false },

          { type: 'refactor', release: 'patch' },

          { type: 'chore', release: false },
          { type: 'chore', scope: 'release', release: 'patch' },
          { type: 'chore', scope: 'deps', release: 'patch' },

          { type: 'style', release: false },

          { type: 'ci', release: false },

          { type: 'test', release: false },

          { type: 'bump', release: 'patch' },

          { type: 'docs', release: false },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
