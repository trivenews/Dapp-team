pragma solidity ^0.4.19;

import "./Untitled.sol";

contract Reputation is UserCreation {


    struct Task {
        string	IPFShash;
		    uint    reward;
    }

    Task[] public tasks;

    mapping (uint => uint) public lookupTasksByGenre;
    mapping (uint => uint) public taskToCreator;


    function _createTask(string _ipfsHash, uint _reward) public {
        uint taskId = tasks.push(Task(_ipfsHash, _reward))
    }




}
