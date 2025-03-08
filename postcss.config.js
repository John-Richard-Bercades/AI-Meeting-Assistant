module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    'postcss-preset-env',
    [
      'postcss-normalize',
      {
        allowDuplicates: false,
      },
    ],
    [
      'tailwindcss',
      {
        config: './tailwind.config.js',
      },
    ],
    'autoprefixer',
  ],
};