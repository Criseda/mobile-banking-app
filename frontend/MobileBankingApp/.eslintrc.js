module.exports = {
  root: true,
  extends: '@react-native',

  // This 'overrides' block is the fix.
  overrides: [
    {
      // For these specific configuration files...
      files: ['.eslintrc.js', 'babel.config.js', 'metro.config.js'],
      // ...we tell ESLint to treat them as Node.js environment scripts.
      env: {
        node: true,
      },
      // ...and we explicitly disable the requirement for a Babel config file, as the error suggests.
      parserOptions: {
        requireConfigFile: false,
      },
    },
  ],
};