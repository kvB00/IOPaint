module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-react', // Add @babel/preset-react here
      '@babel/presets-typescript'
    ],
  };
  