const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ],

    ['@babel/preset-typescript'],

    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV === 'development'
      }
    ]
  ],

  plugins: ['@babel/plugin-transform-runtime']
};

export default config;
