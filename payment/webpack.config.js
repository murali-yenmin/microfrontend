const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  devServer: {
    port: 3004,
    historyApiFallback: true,
    hot: false, 
    headers: {
      'Access-Control-Allow-Origin': '*', 
    },
    client: {
      overlay: false, // Disable overlay for warnings and errors in the browser console
      logging: 'none', // Disables all Webpack Dev Server logs in the browser console
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: './src/index.tsx',  
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
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
      name: 'Payment',
      filename: 'PaymentEntry.js', 
      remotes: {
        Components: 'Components@http://localhost:3001/ComponentsEntry.js',
      },
      exposes: {
        './PaymentScreen': './src/screen/Payment',
      },
      shared: {
        react: {
          singleton: true,
          eager: true, // Force eager loading
          requiredVersion: '^18.0.0', // Specify the required version
        },
        'react-dom': {
          singleton: true,
          eager: true, // Force eager loading
          requiredVersion: '^18.0.0', // Specify the required version
        },
        // 'react-router-dom': {
        //   singleton: true,
        //   requiredVersion: require('./package.json').dependencies['react-router-dom'],
        // },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
       {
              // Custom Plugin for Downloading SCSS Variables
              apply: (compiler) => {
                compiler.hooks.done.tapAsync("DownloadVariables", async (stats, callback) => {
                  try {
                    // Fetch the remote SCSS files
                    const [variablesResponse, resetResponse] = await Promise.all([
                      axios.get("http://localhost:3001/variables.scss", { responseType: "text" }),
                      axios.get("http://localhost:3001/reset.scss", { responseType: "text" })
                    ]);
              
                    const remoteVariablesContent = variablesResponse.data;
                    const remoteResetContent = resetResponse.data;
              
                    const variablesFilePath = path.resolve(__dirname, "./src/assets/scss/variables.scss");
                    const resetFilePath = path.resolve(__dirname, "./src/assets/scss/reset.scss");
              
                    // Check if the local files exist
                    const variablesLocalExists = fs.existsSync(variablesFilePath);
                    const resetLocalExists = fs.existsSync(resetFilePath);
              
                    let variablesLocalContent = '';
                    let resetLocalContent = '';
              
                    if (variablesLocalExists) {
                      variablesLocalContent = fs.readFileSync(variablesFilePath, 'utf-8');
                    }
              
                    if (resetLocalExists) {
                      resetLocalContent = fs.readFileSync(resetFilePath, 'utf-8');
                    }
              
                    // Compare and update variables.scss
                    if (remoteVariablesContent !== variablesLocalContent) {
                      fs.ensureFileSync(variablesFilePath);
                      fs.writeFileSync(variablesFilePath, remoteVariablesContent);
                      console.log("variables.scss updated successfully.");
                    } else {
                      console.log("No changes in variables.scss. Local file is up to date.");
                    }
              
                    // Compare and update reset.scss
                    if (remoteResetContent !== resetLocalContent) {
                      fs.ensureFileSync(resetFilePath);
                      fs.writeFileSync(resetFilePath, remoteResetContent);
                      console.log("reset.scss updated successfully.");
                    } else {
                      console.log("No changes in reset.scss. Local file is up to date.");
                    }
              
                    // Callback to notify Webpack that the hook is complete
                    callback();
                  } catch (error) {
                    console.error("Error downloading or comparing SCSS files:", error);
                    callback(error); // In case of error, pass it to callback
                  }
                });
              
                // Watch for changes periodically (e.g., every 5 seconds)
                setInterval(async () => {
                  try {
                    const [variablesResponse, resetResponse] = await Promise.all([
                      axios.get("http://localhost:3001/variables.scss", { responseType: "text" }),
                      axios.get("http://localhost:3001/reset.scss", { responseType: "text" })
                    ]);
              
                    const remoteVariablesContent = variablesResponse.data;
                    const remoteResetContent = resetResponse.data;
              
                    const variablesFilePath = path.resolve(__dirname, "./src/assets/scss/variables.scss");
                    const resetFilePath = path.resolve(__dirname, "./src/assets/scss/reset.scss");
              
                    const variablesLocalExists = fs.existsSync(variablesFilePath);
                    const resetLocalExists = fs.existsSync(resetFilePath);
              
                    let variablesLocalContent = '';
                    let resetLocalContent = '';
              
                    if (variablesLocalExists) {
                      variablesLocalContent = fs.readFileSync(variablesFilePath, 'utf-8');
                    }
              
                    if (resetLocalExists) {
                      resetLocalContent = fs.readFileSync(resetFilePath, 'utf-8');
                    }
              
                    // Compare and update variables.scss
                    if (remoteVariablesContent !== variablesLocalContent) {
                      fs.ensureFileSync(variablesFilePath);
                      fs.writeFileSync(variablesFilePath, remoteVariablesContent);
                      console.log("variables.scss updated due to remote changes.");
                    }
              
                    // Compare and update reset.scss
                    if (remoteResetContent !== resetLocalContent) {
                      fs.ensureFileSync(resetFilePath);
                      fs.writeFileSync(resetFilePath, remoteResetContent);
                      console.log("reset.scss updated due to remote changes.");
                    }
              
                  } catch (error) {
                    console.error("Error checking remote changes:", error);
                  }
                }, 5000); // Check every 5 seconds
              },
              
            },
  ],
  watch: true,
  devtool: 'eval-source-map', // Better debugging
  stats: {
    warnings: false,
    errors: true,
  },
};
