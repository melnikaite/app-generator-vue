#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');

// node agv.js --model Book --fields '[{"name":"string"},{"location":"bytes32"}]'
var generatorContract = require('./generatorContract.js');
var generatorGeneric = require ('./generatorGeneric');

const targetEntityName = argv.model;
const targetEntityFields = argv.fields;

const generators = [
  {
    name: 'contract',
    templatePath: 'templates/contract_template.sol',
    resultFilePath: 'contracts/' + targetEntityName + 'Contract.sol'
  },
  {
    name: 'test',
    templatePath: 'templates/test_template.js',
    resultFilePath: 'test/' + targetEntityName.toLowerCase() + '.js'
  },
  {
    name: 'migration',
    templatePath: 'templates/2_deploy_contracts_template.js',
    resultFilePath: 'migrations/' + '2_deploy_contracts.js'
  },
  {
    name: 'router',
    templatePath: 'templates/index_template.js',
    resultFilePath: 'src/router/index.js'
  },
  {
    name: 'js',
    templatePath: 'templates/item_template.js',
    resultFilePath: 'src/js/' + targetEntityName.toLowerCase() + '.js'
  },
  {
    name: 'vue',
    templatePath: 'templates/Item_template.vue',
    resultFilePath: 'src/components/' + targetEntityName + '.vue'
  },
];
let fileInitialString;
let resultString;
generators.forEach(generator => {
  switch (generator.name) {
    case 'contract':
      fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
      resultString = generatorContract.createContract(fileInitialString, targetEntityName, targetEntityFields);
      fs.writeFileSync(generator.resultFilePath, resultString);
      console.log("✅ Generated contract: " + generator.resultFilePath);
      break;
    case 'test':
      fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
      resultString = generatorGeneric.createContract(fileInitialString, targetEntityName, targetEntityFields);
     fs.writeFileSync(generator.resultFilePath, resultString);
     console.log("✅ Generated test: " + generator.resultFilePath);
     break;
    case 'migration':
     fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
     resultString = generatorGeneric.createContract(fileInitialString, targetEntityName, targetEntityFields);
    fs.writeFileSync(generator.resultFilePath, resultString);
    console.log("✅ Generated migration: " + generator.resultFilePath);
    break;
    case 'router':
      fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
      resultString = generatorContract.createContract(fileInitialString, targetEntityName, targetEntityFields);
      fs.writeFileSync(generator.resultFilePath, resultString);
      console.log("✅ Generated router: " + generator.resultFilePath);
      break;
    case 'js':
      fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
      resultString = generatorContract.createContract(fileInitialString, targetEntityName, targetEntityFields);
      fs.writeFileSync(generator.resultFilePath, resultString);
      console.log("✅ Generated js: " + generator.resultFilePath);
      break;
    case 'vue':
      fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
      resultString = generatorContract.createContract(fileInitialString, targetEntityName, targetEntityFields);
      fs.writeFileSync(generator.resultFilePath, resultString);
      console.log("✅ Generated vue: " + generator.resultFilePath);
      break;
    default:
      console.log('NOT FOUND!');
  }
});
