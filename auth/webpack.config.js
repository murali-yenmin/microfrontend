const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    client: {
      overlay: false, // Disable overlay for warnings and errors in the browser console
      logging: "none", // Disables all Webpack Dev Server logs in the browser console
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  entry: "./src/index.tsx",
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Match image files
        type: "asset/resource", // Use Webpack's asset modules
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,  // Match .scss files
        use: [
          'style-loader', // Inject CSS into DOM
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader',  // Compiles SCSS into CSS
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Auth",
      filename: "LoginEntry.js",
      remotes: {
        Components: "Components@http://localhost:3001/ComponentsEntry.js",
      },
      exposes: {
        "./Login": "./src/screen/login",
      },
      shared: {
        react: {
          singleton: true,
          eager: true, // Force eager loading
          requiredVersion: "18.3.1", // Specify the required version
        },
        "react-dom": {
          singleton: true,
          eager: true, // Force eager loading
          requiredVersion: "18.3.1", // Specify the required version
        },
        // 'react-router-dom': {
        //   singleton: true,
        //   requiredVersion: require('./package.json').dependencies['react-router-dom'],
        // },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  watch: true,
  devtool: "eval-source-map", // Better debugging
  stats: {
    warnings: false,
    errors: true,
  },
};
