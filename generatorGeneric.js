module.exports.createContract = function(fileInitialString, targetEntity, targetEntityFields) {

  // [ { title: 'string' }, { pages: 'uint' } ]
  const fields = JSON.parse(targetEntityFields);



  let result = fileInitialString
                .replace(/Item/g, targetEntity)
                .replace(/item/g, targetEntity.toLowerCase());

  return result;
}

