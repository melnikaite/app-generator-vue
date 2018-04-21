module.exports.createContract = function(fileInitialString, targetEntity, targetEntityFields) {

  console.log(targetEntityFields);

  let result = fileInitialString.replace(/Item/g, targetEntity).replace(/item/g, targetEntity.toLowerCase());

  return result;
}
