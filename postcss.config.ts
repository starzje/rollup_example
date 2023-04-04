const postcssCopy = require("postcss-copy"); // koristi se za kopiranje assetsa koji se koriste unutar cssa
/**
 * rollup automatski koristi ovaj konfiguracijski file za postcss procesore
 */
module.exports = () => {
  return {
    plugins: [
      postcssCopy({
        dest: "dist", // specifies the output directory for the copied assets. In this case, the assets will be placed in the dist folder.
        template: "[path]/[name].[ext]", // defines the naming pattern for the copied assets. [path] represents the original path (folder structure). [name] represents the original name of the asset, and [ext] represents the file extension. The assets will be placed in a subfolder called assets within the output directory.
        basePath: "src", // sets the base path for the assets. The plugin will consider this path when looking for assets in your CSS files.
        emitFiles: true, // tells the plugin to emit the copied assets as files in the output directory.
        copyUnmodified: true, // specifies whether to copy unmodified assets (assets without any processing, like resizing or optimization) to the output directory. In this case, all unmodified assets will be copied.
      }),
    ],
  };
};
