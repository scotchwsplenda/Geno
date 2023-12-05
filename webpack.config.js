const path = require('path');

module.exports = {
  target: 'node',
  entry: './index.js', // Adjust the entry point based on your project structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
