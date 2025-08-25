import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { RuleSetRule } from 'webpack';

const STYLESHEET_TYPE = {
  CSS: 'css',
  CSS_MODULE: 'cssModule',
  SCSS: 'scss',
  SCSS_MODULE: 'scssModule'
} as const;

type StylesheetType = (typeof STYLESHEET_TYPE)[keyof typeof STYLESHEET_TYPE];

const stylePatterns: Record<StylesheetType, RegExp> = {
  [STYLESHEET_TYPE.CSS]: /\.css$/,
  [STYLESHEET_TYPE.CSS_MODULE]: /\.module\.css$/,
  [STYLESHEET_TYPE.SCSS]: /\.s[ac]ss$/i,
  [STYLESHEET_TYPE.SCSS_MODULE]: /\.module\.s[ac]ss$/i
} as const;

const excludedPatterns: Partial<Record<StylesheetType, RegExp>> = {
  [STYLESHEET_TYPE.CSS]: stylePatterns[STYLESHEET_TYPE.CSS_MODULE],
  [STYLESHEET_TYPE.SCSS]: stylePatterns[STYLESHEET_TYPE.SCSS_MODULE]
};

export const createStyleRule = ({
  isProduction,
  styleType
}: {
  isProduction: boolean;
  styleType: StylesheetType;
}): RuleSetRule => {
  const isSass = styleType === STYLESHEET_TYPE.SCSS || styleType === STYLESHEET_TYPE.SCSS_MODULE;
  const isModule = styleType === STYLESHEET_TYPE.CSS_MODULE || styleType === STYLESHEET_TYPE.SCSS_MODULE;

  const loaders = [
    {
      loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: isSass ? 1 : 0,
        sourceMap: !isProduction,
        modules: isModule
          ? {
              localIdentName: isProduction ? '[contenthash:base64]' : '[path][name]__[local]--[contenthash:base64:5]',
              mode: 'local' as const,
              namedExport: false
            }
          : {
              mode: 'icss' as const
            }
      }
    },
    isSass && {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          style: 'expanded'
        },
        sourceMap: !isProduction
      }
    }
  ].filter(Boolean);

  return {
    test: stylePatterns[styleType],
    exclude: excludedPatterns[styleType],
    use: loaders,
    sideEffects: !isModule
  };
};

export const createStyleRules = ({ isProduction }: { isProduction: boolean }): RuleSetRule[] => {
  return [
    createStyleRule({ isProduction, styleType: STYLESHEET_TYPE.CSS }),
    createStyleRule({ isProduction, styleType: STYLESHEET_TYPE.CSS_MODULE }),
    createStyleRule({ isProduction, styleType: STYLESHEET_TYPE.SCSS }),
    createStyleRule({ isProduction, styleType: STYLESHEET_TYPE.SCSS_MODULE })
  ];
};
