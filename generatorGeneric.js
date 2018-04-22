module.exports.createContract = function(fileInitialString, targetEntity, targetEntityFields) {

  // [ { title: 'string' }, { pages: 'uint' } ]
  const fields = JSON.parse(targetEntityFields);



  let result = fileInitialString
                .replace(/Entityname/g, targetEntity)
                .replace(/entityname/g, targetEntity.toLowerCase());

  return result;
}

