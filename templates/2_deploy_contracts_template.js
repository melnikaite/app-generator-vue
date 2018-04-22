var EntitynameContract = artifacts.require("./EntitynameContract.sol");
var EventContract = artifacts.require("./EventContract.sol");




module.exports = function(deployer) {
  deployer.deploy(EntitynameContract);
  deployer.deploy(EventContract);
};
