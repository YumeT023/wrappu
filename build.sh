#!/usr/bin/env bash

# run test
npm run test

# rebuild
rm -rf dist
npm run build

# do not generate .js file for type declaration
rm -rf dist/./@types/*js dist/./type.js dist/./types.js