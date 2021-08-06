module.exports = {
  target: 'serverless',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.module.rules.push({
      test: /\.mdx?$/,
      use: 'raw-loader',
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json', // Required by Webpack v4
      use: 'yaml-loader',
    });

    config.resolve.fallback = {
      fs: false,
      path: require.resolve('path-browserify'),
    };

    return config;
  },

  env: {
    URL: process.env.URL,
    GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
  },
};
