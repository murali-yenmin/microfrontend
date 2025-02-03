const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
    hot: false,
    headers: {
      "Access-Control-Allow-Origin": "*", // Fix cross-origin issues
    },
    client: {
      overlay: false, // Disable overlay for warnings and errors in the browser console
      logging: "none", // Disables all Webpack Dev Server logs in the browser console
    },
    static: {
      directory: "./dist", // Serve static files from the output directory
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  entry: "./src/index.tsx",

  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Match image files
        type: "asset/resource", // Use Webpack's asset modules
      },
      {
        test: /\.(ts|tsx)$/, // Match TypeScript and TSX files
        use: "ts-loader", // Use ts-loader to handle TypeScript files
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/, // For JavaScript and JSX files
        use: "babel-loader", // Use Babel for JavaScript files
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/, // Match .scss files
        use: [
          "style-loader", // Inject CSS into DOM
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles SCSS into CSS
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Components",
      filename: "ComponentsEntry.js",
      exposes: {
        './Input': './src/components/input',
        "./TextArea": "./src/components/textArea",
        "./SelectDropdown": "./src/components/selectDropdown",
        "./PasswordInput": "./src/components/passwordInput",
        "./FileUpload": "./src/components/fileUpload",
        "./CustomDatePicker": "./src/components/customDatePicker",
        "./CustomCheckbox": "./src/components/customCheckbox",
        "./CustomCheckboxGroup": "./src/components/customCheckboxGroup",
        "./CustomRadioGroup": "./src/components/customRadioGroup",
        "./CustomToggleSwitch": "./src/components/customToggleSwitch",
        "./PrimaryButton": "./src/components/primaryButton",
        "./Layout": "./src/layout",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "18.3.1", // Specify the required version
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "18.3.1", // Specify the required version
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/scss/variables.scss", // Specify the path to the variables.scss
          to: "variables.scss", // Destination where the file will be copied
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/scss/reset.scss", // Specify the path to the reset.scss
          to: "reset.scss", // Destination where the file will be copied
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets/scss/global.scss", // Specify the path to the reset.scss
          to: "global.scss", // Destination where the file will be copied
        },
      ],
    }),
  ],
  devtool: "eval-source-map", // Better debugging
  stats: {
    warnings: false, // Suppress all warnings in the terminal
    errors: true, // Keep errors
    errorDetails: true, // Show error details
  },
};
