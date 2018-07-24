pragma solidity ^0.4.24;

// This is an RBAC contract
contract Roles {

  mapping(address => mapping(string => bool)) roles;
  
  address[] curators;
  address[] researchers;
  address[] verifiers;
  address[] witnesses;
  
  function assignRole(address _user, string _role) internal {
    roles[_user][_role] = true;
    // this just assigns any role right now
    // we need to check reputation and assign correct role and then add them
    // to the appropriate array
  }
  
  function unassignRole(address _user, string _role) internal {
    roles[_user][_role] = false;
    // TODO: this will be fully implemented later
  }
  
  function isAssignedRole(address _user, string _role) view public returns (bool) {
    return roles[_user][_role];
  }
  
  // modifier hasReputation() {
  //   // check the reputation score that the person has and assign role
  //   _;
  // }
}

