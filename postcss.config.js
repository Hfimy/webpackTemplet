module.exports = {
  plugins: [
    require('autoprefixer')({ remove: false }),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: []
    })
  ]
};
