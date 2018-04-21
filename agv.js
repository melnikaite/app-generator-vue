#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

console.dir(argv);

convert = (fileInitialString, targetEntity) => {
  let result = fileInitialString.replace(/Item/g, targetEntity).replace(/item/g, targetEntity.toLowerCase());
  return result;
}

const targetEntity = argv.create;

let fileInitialString = fs.readFileSync('contracts/ItemContract.sol', 'utf8');

let resultString = convert(fileInitialString, targetEntity);

fs.appendFileSync('contracts/' + targetEntity + 'Contract.sol', resultString);

// console.log("RESULT: " + resultString);

// var camelCased = myString.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
