// const { ModuleFederationPlugin } = require('webpack').container;
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   devServer: {
//     port: 3001,
//     historyApiFallback: true,
//     hot: false,
//     headers: {
//       'Access-Control-Allow-Origin': '*', // Fix cross-origin issues
//     },
//     client: {
//       overlay: false, // Disable overlay for warnings and errors in the browser console
//       logging: 'none', // Disables all Webpack Dev Server logs in the browser console
//     },
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   entry: './src/index.tsx',

//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,  // Match TypeScript and TSX files
//         use: 'ts-loader',  // Use ts-loader to handle TypeScript files
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.(js|jsx)$/,  // For JavaScript and JSX files
//         use: 'babel-loader',  // Use Babel for JavaScript files
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.scss$/,  // Match .scss files
//         use: [
//           'style-loader', // Inject CSS into DOM
//           'css-loader',   // Translates CSS into CommonJS
//           'sass-loader',  // Compiles SCSS into CSS
//         ],
//       },
//     ],
//   },
//   optimization: {
//     runtimeChunk: 'single',
//   },
//   plugins: [
//     new ModuleFederationPlugin({
//       name: 'Components',
//       filename: 'ComponentsEntry.js',
//       exposes: {
//         "./Input": "./src/components/input",
//       },
//       shared: {
//         react: {
//           singleton: true, // Ensures only one version of React is used
//           eager: true,    // Avoid eager consumption of React
//           requiredVersion: '18.3.1', // Specify the required version
//         },
//         'react-dom': {
//           singleton: true,
//           eager: true,    // Avoid eager consumption of react-dom
//           requiredVersion: '18.3.1', // Specify the required version
//         },
//       },
//     }),
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//     }),
//   ],
//   devtool: 'eval-source-map', // Better debugging
//   stats: {
//     warnings: false, // Suppress all warnings in the terminal
//     errors: true,    // Keep errors
//     errorDetails: true, // Show error details
//   },
// };
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const DotenvWebpackPlugin = require('dotenv-webpack'); // Import the plugin

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
        './Style': './src/assets/scss/style.js',
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
        // './Button': './src/components/button',
        // './UseAuth': './src/hooks/useAuth',
        // './AxiosService': './src/helpers',
        // './Store': './src/store/store',
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
        //   requiredVersion: '18.3.1', // Specify the required version
        // },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // new DotenvWebpackPlugin({ // Add this plugin to load environment variables
    //   path: './.env', // Default is .env, specify if your file has a different name
    //   safe: false,    // Optional: Load a .env.example file for required variables
    // }),
  ],
  devtool: "eval-source-map", // Better debugging
  stats: {
    warnings: false, // Suppress all warnings in the terminal
    errors: true, // Keep errors
    errorDetails: true, // Show error details
  },
};
