import webpack from 'webpack';
import colors from 'colors';
import webpackConfig from '../../webpack.config.prod';

process.env.NODE_ENV = 'production';
console.log('Generating minified bundle for production via webpack. This will take a moment...'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }
  const jsonStats = stats.toJson();
  if (jsonStats.hasErrors) {
    return jsonStats.errors.map((error) => { return console.log(error.red); });
  }
  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map((warning) => { return console.log(warning.yellow); });
  }
  console.log(`Webpack stats: ${stats}`);
  console.log('Your app has been compiled to production mode and written to /dist. Its ready now'.green);
  return 0;
});
