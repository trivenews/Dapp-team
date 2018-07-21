pragma solidity ^0.4.24;
// this is going to be exchanged for the RBAC in openzeppelin
import './User.sol';

contract RBAC is User {
  mapping(address => mapping(string => bool)) roles;
  
  function assignRole(address entity, string role) hasRole('superadmin') {
    roles[entity][role] = true;
  }
  
  function unassignRole(address entity, string role) hasRole('superadmin') {
    roles[entity][role] = false;
  }
  
  function isAssignedRole(address entity, string role) returns (bool) {
    return roles[entity][role];
  }
  
  modifier hasRole(string role) {
    if (!roles[msg.sender][role] && msg.sender != creator) {
      throw;
    }
    _;
  }
}

