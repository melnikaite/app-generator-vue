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
    name: 'itemJs',
    templatePath: 'src/js/item.js.tmpl',
    resultFilePath: 'src/js/' + targetEntityName.toLowerCase() + '.js'
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
  }
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
    case 'itemJs':
      console.log('🙏 Help wanted! ' + generator.resultFilePath + ' needs to be generated... ');
      break;
    default:
      console.log('NOT FOUND!');
  }
});
