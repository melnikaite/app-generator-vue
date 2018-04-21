module.exports.createContract = function(fileInitialString, targetEntity, targetEntityFields) {

  // [ { title: 'string' }, { pages: 'uint' } ]
  const fields = JSON.parse(targetEntityFields);

  const typeValueSemicolonSeparated  = this.typeValueSemicolonSeparated(fields);
  const typeValueCommaSeparated      = this.typeValueCommaSeparated(fields);
  const valueCommaSeparated          = this.valueCommaSeparated(fields);
  const itemMapIdValueCommaSeparated = this.itemMapIdValueCommaSeparated(fields);

  let result = fileInitialString.replace(/Item/g, targetEntity).replace(/item/g, targetEntity.toLowerCase());

  return result;
}

// string name; bytes32 location;
module.exports.typeValueSemicolonSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `${propertyType} ${propertyName}; `;
  });
  console.log("typeValueSemicolonSeparated ", (result === "string name; bytes32 location; "));
  return result;
}

// string name, bytes32 location
module.exports.typeValueCommaSeparated = function(fields) {
  let result = '';
  // todo
  console.log("typeValueCommaSeparated ", (result === "string name, bytes32 location"));
}

// itemMap[id].name = name; itemMap[id].location = location;
module.exports.itemMapIdValueEqualValueSemicolonSeparated = function(fields) {
  let result = '';
  // todo
  console.log("itemMapIdValueEqualValueSemicolonSeparated ", (result === "itemMap[id].name = name; itemMap[id].location = location; "));
}

// name, location
module.exports.valueCommaSeparated = function(fields) {
  let result = '';
  // todo
  console.log("valueCommaSeparated ", (result === "name, location"));
}

// itemMap[id].name, itemMap[id].location
module.exports.itemMapIdValueCommaSeparated = function(fields) {
  let result = '';
  // todo
  console.log("itemMapIdValueCommaSeparated ", (result === "itemMap[id].name, itemMap[id].location"));
}
