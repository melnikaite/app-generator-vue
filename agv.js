#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));

const fs = require('fs');

// node agv.js --model Book --fields '[{"name":"string"},{"location":"bytes32"}]'
var generatorContract = require('./generatorContract.js');

const targetEntityName = argv.model;
const targetEntityFields = argv.fields;

const generators = [
  {
    name: 'contract',
    templatePath: 'contracts/TemplateContract.sol.tmpl',
    resultFilePath: 'contracts/' + targetEntityName + 'Contract.sol'
  },
  {
    name: 'itemJs',
    templatePath: 'src/js/item.js.tmpl',
    resultFilePath: 'src/js/' + targetEntityName.toLowerCase() + '.js'
  }
];

generators.forEach(generator => {
  switch (generator.name) {
    case 'contract':
      let fileInitialString = fs.readFileSync(generator.templatePath, 'utf8');
      let resultString = generatorContract.createContract(fileInitialString, targetEntityName, targetEntityFields);
      fs.appendFileSync(generator.resultFilePath, resultString);
      console.log("✅ Generated contract: " + generator.resultFilePath);
      break;
    case 'itemJs':
      console.log('🙏 Help wanted! ' + generator.resultFilePath + ' needs to be generated... ');
      break;
    default:
      console.log('NOT FOUND!');
  }
});
