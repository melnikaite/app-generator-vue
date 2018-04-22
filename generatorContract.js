module.exports.createContract = function(fileInitialString, targetEntity, targetEntityFields) {

  // [ { title: 'string' }, { pages: 'uint' } ]
  const fields = JSON.parse(targetEntityFields);

  const typeValueSemicolonSeparated  = this.typeValueSemicolonSeparated(fields);
  const typeValueCommaSeparated      = this.typeValueCommaSeparated(fields);
  const valueCommaSeparated          = this.valueCommaSeparated(fields);
  const valueQuotedCommaSeparated    = this.valueQuotedCommaSeparated(fields);
  const thisCreateFormCommaSeparated = this.thisCreateFormCommaSeparated(fields);
  const thisUpdateFormCommaSeparated = this.thisUpdateFormCommaSeparated(fields);
  const valueUndefinedCommaSeparated = this.valueUndefinedCommaSeparated(fields);
  const thisUpdateFormNewLineSeparated = this.thisUpdateFormNewLineSeparated(fields);
  const itemMapIdValueCommaSeparated = this.itemMapIdValueCommaSeparated(fields);
  const itemMapIdValueEqualValueSemicolonSeparated = this.itemMapIdValueEqualValueSemicolonSeparated(fields);
  const valueResultCommaSeparated = this.valueResultCommaSeparated(fields);
  const typeCommaSeparated = this.typeCommaSeparated(fields);
  const tableFieldTemplate = this.tableFieldTemplate(fields);
  const createFormGroup = this.createFormGroup(fields);

  let result = fileInitialString
                .replace(/_typeValueSemicolonSeparated_/g,  typeValueSemicolonSeparated)
                .replace(/_typeValueCommaSeparated_/g,      typeValueCommaSeparated)
                .replace(/_valueCommaSeparated_/g,          valueCommaSeparated)
                .replace(/_valueQuotedCommaSeparated_/g,    valueQuotedCommaSeparated)
                .replace(/_thisCreateFormCommaSeparated_/g, thisCreateFormCommaSeparated)
                .replace(/_thisUpdateFormCommaSeparated_/g, thisUpdateFormCommaSeparated)
                .replace(/_valueUndefinedCommaSeparated_/g, valueUndefinedCommaSeparated)
                .replace(/_thisUpdateFormNewLineSeparated_/g, thisUpdateFormNewLineSeparated)
                .replace(/_itemMapIdValueCommaSeparated_/g, itemMapIdValueCommaSeparated)
                .replace(/_itemMapIdValueEqualValueSemicolonSeparated_/g, itemMapIdValueEqualValueSemicolonSeparated)
                .replace(/_valueResultCommaSeparated_/g, valueResultCommaSeparated)
                .replace(/_typeCommaSeparated_/g, typeCommaSeparated)
                .replace(/_tableFieldTemplate_/g, tableFieldTemplate)
                .replace(/_createFormGroup_/g, createFormGroup)
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

// 'name', 'location'
module.exports.valueQuotedCommaSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += ` '${propertyName}',`;
  });
  result = result.trim();
  var commaIndex = result.lastIndexOf(',');
  result = result.substring(0,commaIndex);
  return result;

}

// this.createForm.name, this.createForm.location
module.exports.thisCreateFormCommaSeparated = function(fields) {
  let results = [];
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    results.push(`this.createForm.${propertyName}`);
  });
  return results.join(', ');

}

// this.updateForm.name, this.updateForm.location
module.exports.thisUpdateFormCommaSeparated = function(fields) {
  let results = [];
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    results.push(`this.updateForm.${propertyName}`);
  });
  return results.join(', ');

}

// name: undefined, location: undefined,
module.exports.valueUndefinedCommaSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `          ${propertyName}: undefined,\n`;
  });
  return result;
}

/*
        this.updateForm.name = this.itemMap[id].name;
        this.updateForm.location = this.itemMap[id].location;
 */
module.exports.thisUpdateFormNewLineSeparated = function(fields) {
  let result = '';
  fields.forEach((property) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `        this.updateForm.${propertyName} = this.itemMap[id].${propertyName};\n`;
  });
  return result;
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

// name: result[4], location: result[5],
module.exports.valueResultCommaSeparated = function(fields) {
  let result = '';
  fields.forEach((property, index) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `          ${propertyName}: result[${index + 4}],\n`;
  });
  return result;
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

/*
      <template slot="name" slot-scope="data">
        <div v-show="editing === data.item">
          <b-form-input v-model="updateForm.name" required :ref="'item-name-' + data.item"></b-form-input>
        </div>
        <div v-show="editing !== data.item">
          {{itemMap[data.item].name}}
        </div>
      </template>
 */
module.exports.tableFieldTemplate = function(fields) {
  let result = '';
  fields.forEach((property, index) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `
      <template slot="${propertyName}" slot-scope="data">
        <div v-show="editing === data.item">
          <b-form-input v-model="updateForm.${propertyName}" required :ref="'item-${propertyName}-' + data.item"></b-form-input>
        </div>
        <div v-show="editing !== data.item">
          {{itemMap[data.item].${propertyName}}}
        </div>
      </template>
    `;
  });
  return result;
}
/*
      <b-form-group horizontal breakpoint="md" id="nameGroup" label="Name" label-for="name">
        <b-form-input id="name" v-model="createForm.name" required></b-form-input>
      </b-form-group>
 */
module.exports.createFormGroup = function(fields) {
  let result = '';
  fields.forEach((property, index) => {
    const propertyType = property[Object.keys(property)[0]];
    const propertyName = Object.keys(property)[0];
    result += `
      <b-form-group horizontal breakpoint="md" id="${propertyName}Group" label="${propertyName}" label-for="${propertyName}">
        <b-form-input id="${propertyName}" v-model="createForm.${propertyName}" required></b-form-input>
      </b-form-group>
    `;
  });
  return result;
}
