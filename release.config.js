module.exports = {
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
          { type: 'build', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'docs', release: 'patch' },
          { type: 'build', release: 'patch' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: './dist',
            label: 'Distribution Files',
          },
        ],
      },
    ],
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
