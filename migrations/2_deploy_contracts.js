const Chargingbox = artifacts.require("./Chargingbox.sol");

module.exports = function(deployer) {
  deployer.deploy(Chargingbox);
};
