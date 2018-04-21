#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
var createFromTemplate = require('./createFromTemplate.js');

const targetEntityName = argv.model;
const targetEntityFields = argv.fields;

let fileInitialString = fs.readFileSync('contracts/TemplateContract.sol.tmpl', 'utf8');

let resultString = createFromTemplate.createContract(fileInitialString, targetEntityName, targetEntityFields);

const createdContractFilePath = 'contracts/' + targetEntityName + 'Contract.sol';

fs.appendFileSync(createdContractFilePath, resultString);
// console.log(resultString);

console.log("Generated contract: " + createdContractFilePath);
