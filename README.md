# Rollup Project Example

## Basic setup for project that uses: Typescript, React, scss and Rollup for bundling.

Goal was to create a simple build for react component library using `Rollup` for bundling, instead of `webpack`.
Pain point was getting all images (images used in scss and images used in jsx `<img/>` tag) copied to `dist` folder, and make them keep their original folder structure.

With this build, component library is able to pack images inside of bundled css and bundled js files. Meaning, you can use component from library that was built like this, that has image inside of `<img/>` tag OR image inside of css file, without having to import that image yourself.


## Getting started

1. Clone this respository:
```bash
git clone https://github.com/starzje/rollup_example.git
```

2. Change into the project directory:
```bash
cd rollup_example
```

3. install the dependencies:
```bash
npm install
#or
pnpm install
#or
yarn
```

## Usage
To build the project so you can see the `dist` folder and play around with it:
```bash
npm run build
##or
pnpm run build
##or
yarn build
```
This will create a `dist` folder containing the bundled output files: `index.js` and `index.d.ts`. It will also include all images that are used in project (css or html). Unused images will not be copied