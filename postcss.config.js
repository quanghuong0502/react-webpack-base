import postcssPresetEnv from 'postcss-preset-env';

const config = _ctx => ({
  plugins: [
    postcssPresetEnv({
      autoprefixer: {},
    }),
  ],
});

export default config;
