const Token = artifacts.require('./Token.sol')
const TriveDapp = artifacts.require('./Challenge.sol');

module.exports = function(deployer) {
  deployer.deploy(Token, '20000000000000000', 'Trive', 'TRV', '8')
  .then(function() {
    return deployer.deploy(TriveDapp, Token.address)
  })
};
