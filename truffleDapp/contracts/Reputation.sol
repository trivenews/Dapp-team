pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './Roles.sol';

contract Reputation is SafeMath, RBAC {

    using SafeMath for uint256;
    
    mapping (address => uint) userReputation;
    mapping (address => uint) violationCount;

    function incrementViolationCount(address _userAddress) internal {
    	violationCount[_userAddress] = violationCount[_userAddress].add(1);
    }
    
    function incrementReputation(address _userAddress) internal {
    	userReputation[_userAddress] = userReputation[_userAddress].add(1);
    }
    
    function getReputation(address _user) public view returns(uint) {
        return userReputation[_user] / violationCount[_user];
    }
    
}

