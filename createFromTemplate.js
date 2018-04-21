module.exports.createContract = function(fileInitialString, targetEntity, targetEntityFields) {

  // [ { title: 'string' }, { pages: 'uint' } ]
  const fields = JSON.parse(targetEntityFields);

  const typeValueSemicolonSeparated  = this.typeValueSemicolonSeparated(fields);
  const typeValueCommaSeparated      = this.typeValueCommaSeparated(fields);
  const valueCommaSeparated          = this.valueCommaSeparated(fields);
  const itemMapIdValueCommaSeparated = this.itemMapIdValueCommaSeparated(fields);
  const itemMapIdValueEqualValueSemicolonSeparated = this.itemMapIdValueEqualValueSemicolonSeparated(fields);
  const typeCommaSeparated = this.typeCommaSeparated(fields);

  let result = fileInitialString
                .replace(/_typeValueSemicolonSeparated_/g,  typeValueSemicolonSeparated)
                .replace(/_typeValueCommaSeparated_/g,      typeValueCommaSeparated)
                .replace(/_valueCommaSeparated_/g,          valueCommaSeparated)
                .replace(/_itemMapIdValueCommaSeparated_/g, itemMapIdValueCommaSeparated)
                .replace(/_itemMapIdValueEqualValueSemicolonSeparated_/g, itemMapIdValueEqualValueSemicolonSeparated)
                .replace(/_typeCommaSeparated_/g, typeCommaSeparated)
                .replace(/Item/g, targetEntity)
                .replace(/item/g, targetEntity.toLowerCase());

  return result;
}

// string name; bytes32 location;
module.exports.typeValueSemicolonSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `${propertyType} ${propertyName}; \n`;
  });
  // console.log ("result func 1 =", result);
  //should be string   name;
  // bytes32 location;
  // console.log("typeValueSemicolonSeparated ", (result === "string name; \n bytes32 location; \n"));
  return result;
}

// string name, bytes32 location
module.exports.typeValueCommaSeparated = function(fields) {
  let result = '';
  // todo
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += ` ${propertyType} ${propertyName},`;
  });
  result = result.trim();
  var commaIndex = result.lastIndexOf(',');
  result = result.substring(0,commaIndex);
  // console.log ("result func 2 =", result);
  return result;
  //should be  string name, bytes32 location
  // console.log("typeValueCommaSeparated ", (result === "string name, bytes32 location"));
}



// name, location
module.exports.valueCommaSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += ` ${propertyName},`;
  });
  result = result.trim();
  var commaIndex = result.lastIndexOf(',');
  result = result.substring(0,commaIndex);
  // console.log ("result func 3 =", result);
  return result;
  // console.log("valueCommaSeparated ", (result === "name, location"));

}

// itemMap[id].name, itemMap[id].location
module.exports.itemMapIdValueCommaSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += ` itemMap[id].${propertyName},`;
  });
  result = result.trim();
  var commaIndex = result.lastIndexOf(',');
  result = result.substring(0,commaIndex);
  // console.log ("result func 4 =", result);
  return result;
  // console.log("itemMapIdValueCommaSeparated ", (result === "itemMap[id].name, itemMap[id].location"));
}

// itemMap[id].name = name; itemMap[id].location = location;
module.exports.itemMapIdValueEqualValueSemicolonSeparated = function(fields) {
  let result = '';
  debugger
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += ` itemMap[id].${propertyName}=${propertyName};\n`;
  });
  result = result.trim();
  // var commaIndex = result.lastIndexOf(',');
  // result = result.substring(1,commaIndex);
  // console.log ("result func 5 =", result);
  return result;
  //should be:
  //  itemMap[id].name = name;
  //  itemMap[id].location = location;
  // console.log("itemMapIdValueEqualValueSemicolonSeparated ", (result === "itemMap[id].name = name; itemMap[id].location = location; "));
}
// string, bytes32
module.exports.typeCommaSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += ` ${propertyType},`;
  });
  result = result.trim();
  var commaIndex = result.lastIndexOf(',');
  result = result.substring(0,commaIndex);
  // console.log ("result func 6 =", result);
  return result;
  //should be   string, bytes32

}
