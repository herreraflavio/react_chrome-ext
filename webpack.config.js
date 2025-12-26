// const path = require("path");
// const HTMLPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

// module.exports = {
//   entry: {
//     index: "./src/index.tsx",
//   },
//   mode: "production",
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx|js|jsx)$/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-react"],
//           },
//         },
//         exclude: /node_modules/,
//       },
//       {
//         exclude: /node_modules/,
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//     ],
//   },
//   plugins: [
//     new CopyPlugin({
//       patterns: [{ from: "manifest.json", to: "../manifest.json" }],
//     }),
//     ...getHtmlPlugins(["index"]),
//   ],
//   resolve: {
//     extensions: [".tsx", ".ts", ".js", ".jsx"],
//   },
//   output: {
//     path: path.join(__dirname, "dist/js"),
//     filename: "[name].js",
//   },
// };

// function getHtmlPlugins(chunks) {
//   return chunks.map(
//     (chunk) =>
//       new HTMLPlugin({
//         title: "React extension",
//         filename: `${chunk}.html`,
//         chunks: [chunk],
//       })
//   );
// }
const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: "images/[name].[ext]", // Output path for images
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "manifest.json", to: "../manifest.json" }],
    }),
    ...getHtmlPlugins(["index"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLPlugin({
        title: "New Tab",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
