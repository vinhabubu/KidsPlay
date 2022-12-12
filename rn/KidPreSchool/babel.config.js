module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '~/',
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: [
        'react-native-paper/babel',
        'transform-remove-console',
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env',
            allowUndefined: true,
            safe: true,
          },
        ],
      ],
    },
    development: {
      plugins: [
        [
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env.dev',
            allowUndefined: true,
            safe: true,
          },
        ],
      ],
    },
  },
};
