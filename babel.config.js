module.exports = {
  presets: [
    [require('@babel/preset-env'), {
      useBuiltIns: 'usage',
      // useBuiltIns: 'entry',
      corejs: 3,
    }],
    require('@babel/preset-typescript'),
    require('@vue/babel-preset-jsx'), 
  ],
  plugins: [
    require('@babel/plugin-syntax-dynamic-import'),
    [require('@babel/plugin-proposal-decorators'), {
      legacy: true,
    }],
  ],
};
