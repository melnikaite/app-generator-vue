var CarContract = artifacts.require("./CarContract.sol");
var EventContract = artifacts.require("./EventContract.sol");




module.exports = function(deployer) {
  deployer.deploy(CarContract);
  deployer.deploy(EventContract);
};
