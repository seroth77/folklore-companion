const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const path = require("path");

const cleanWebpackPlugin = new CleanWebpackPlugin()

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

const styleLintPlugin = new StyleLintPlugin();

module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                include: path.join(__dirname, "src"),
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
              test: /\.scss$/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 2,
                    modules: true,
                  },
                },
                "postcss-loader",
                "sass-loader"
              ],
              exclude: [
                /node_modules/,
                path.join(__dirname, "src", "styles")
              ],
            },
            {
              test: /\.scss$/,
              use: [
                "style-loader",
                "css-loader",
                "postcss-loader",
                "sass-loader"
              ],
              include: [
                path.join(__dirname, "src", "styles")
              ]
            },
        ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json", ".css", ".scss"]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          },
        }
      }
    },
    plugins: [
      cleanWebpackPlugin,
      htmlPlugin,
      styleLintPlugin,
    ]
};
