import { resolve } from "path";
import commonjs from "@rollup/plugin-commonjs"; // pomaže pri importanju stvari iz node modulesa ako nemaju relativni import, npr import "react" from react
import { nodeResolve } from "@rollup/plugin-node-resolve"; // radi u kombinaciji s commonjs pluginom, ako neki external dependancy koristi required syntaxu za import, ovo pomaže pri resolvu
import { defineConfig } from "rollup"; // ovo koristimo da imamo Intellisense unutar rollup configa: https://rollupjs.org/command-line-interface/#config-intellisense
import typescript from "@rollup/plugin-typescript"; // procesira typescript fileove koristeći tsconfig iz našeg projekta
import postcss from "rollup-plugin-postcss"; // plugin koji procesira .scss u css (slično kao sass-loader, css-loader i MiniCssExtractPlugin iz webpacka)
import url from "@rollup/plugin-url"; // slično kao file loader iz webpacka, koristimo ga zbog slika unutar HTML (tj. JSX-a) koje su unutar <img/> taga

const rollupConfig = defineConfig({
  input: "src/index.ts", // entry point
  output: {
    dir: "dist", // output directory
    format: "es", // options: es (ES modules) | umd (Universal Module Definition) | cjs (CommonJS) | amd (Asynchronous Module Definition) | system (SystemJS) | iife (Immediately Invoked Function Expression)
    sourcemap: true, // generate sourcemap
  },
  plugins: [
    nodeResolve(), // is used to help Rollup resolve module imports according to the Node.js module resolution algorithm. By default, Rollup can only resolve relative imports (e.g., ./my-module.js or ../my-module.js). However, many dependencies are imported using their package name (e.g., import React from 'react'). The nodeResolve() plugin enables Rollup to understand and resolve these package imports correctly by looking up the correct file in the node_modules folder.
    commonjs(), // is used to handle dependencies that are written using the CommonJS module format, which is the format used by Node.js and the vast majority of packages published to npm. Although many modern JavaScript libraries have started to provide ES module builds, there might still be some dependencies in your project that are only available in the CommonJS format. By using the commonjs() plugin, you ensure that Rollup can understand and bundle these dependencies correctly.
    typescript(), // compile typescript files to js using tsc. use tsconfig.json for configuration
    // Example below is if we need to have multiple css files in output (eg. each remote-module has its own css file)
    postcss({
      include: "**/main.scss", //sepcifies the entry point for main css file
      extract: resolve("dist/app.css"), // tells the plugin to extract the CSS into a separate file, instead of inlining it into the JavaScript bundle.
      use: ["sass"], // specifies that the plugin should use the Sass preprocessor to process the input files. Uses postcss.config.js file for configuraton
      minimize: true, // minifies css output
    }),
    postcss({
      include: "**/secondApp.scss", // specifies the entry point for second css file
      extract: resolve("dist/secondApp.css"), // tells the plugin to extract the CSS into a separate file, instead of inlining it into the JavaScript bundle.
      use: ["sass"], // specifies that the plugin should use the Sass preprocessor to process the input files. Uses postcss.config.js file for configuraton
      minimize: true, // minifies css output
    }),
    url({
      include: /.*\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i, // Specify the file types to handle
      limit: 0, // Inline the image as base64 encoded data URLs, if limit is set to 0, all files will be copied.
      fileName: "assets/[dirname]/[name][extname]", // Output images to dist/assets folder with the actual name of the image and also keep the original subdirectories
      sourceDir: "src/assets", // This is used so html images keep their original folder structure, since [dirname] in fileName only returns single parent folder, not all parent folders. When using the [dirname] replacement in fileName, use this directory as the source directory from which to create the file path rather than the parent directory of the imported file
      publicPath: "/node_modules/@lib/name-of-your-library/dist/", // Changes path for images that are inside of <img> tag. This is replicated to do same thing as current webpack config
    }),
  ],
  treeshake: {
    preset: "smallest", // This preset aggressively removes as much dead code as possible, prioritizing the smallest possible bundle size over other factors such as build time. This can result in longer build times, but the output will be more optimized.
  },
  // If react/jsx-runtime is not included as external dependancy, we get this warning on build: "Unresolved dependencies" for all components https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
  external: ["react", "react-dom"], // tells Rollup that react, react-dom, and react/jsx-runtime are external dependencies. When your bundled code is executed.
});

export default rollupConfig;
