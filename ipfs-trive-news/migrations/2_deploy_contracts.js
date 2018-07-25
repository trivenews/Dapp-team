var TriveDapp = artifacts.require('Voting');

module.exports = function(deployer) {
  deployer.deploy(TriveDapp);
};

