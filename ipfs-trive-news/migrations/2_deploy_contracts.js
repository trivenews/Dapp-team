var TriveDapp = artifacts.require("Voting");
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

module.exports = function(deployer) {
  deployer.link(SafeMath, Voting);
  deployer.deploy(Voting);
};

