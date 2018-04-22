const EntitynameContract = artifacts.require('./EntitynameContract.sol');

module.exports = function(deployer) {
  deployer.deploy(EntitynameContract);
};
