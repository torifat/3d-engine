export default {
  files: ['test/**'],
  concurrency: 4,
  timeout: '1m',
  typescript: {
    rewritePaths: {
      'test/': 'dist/test/',
    },
  },
};
