var ItemContract = artifacts.require("./ItemContract.sol");
var EventContract = artifacts.require("./EventContract.sol");




module.exports = function(deployer) {
  deployer.deploy(ItemContract);
  deployer.deploy(EventContract);
};
