const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  return {
    entry: "./src/main.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].[contenthash].js",
      clean: true,
      // Tambahkan publicPath untuk production
      publicPath: "/",
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      hot: true,
      open: true,
      port: 4000,
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        // JavaScript dan JSX
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        // CSS, PostCSS, Tailwind
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "postcss-loader"],
        },
        // Assets (gambar, font, dll)
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/[name].[hash][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[hash][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public", // Salin semua dari folder 'public'
            globOptions: {
              // Abaikan file 'index.html' karena sudah diurus oleh HtmlWebpackPlugin
              ignore: ["**/index.html"],
            },
          },
          {
            from: path.resolve(__dirname, "ml_model"),
            to: "ml_model",
            noErrorOnMissing: true,
          },
        ],
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash].css",
        }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx"],
    },
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
