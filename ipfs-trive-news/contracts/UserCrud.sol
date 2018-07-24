pragma solidity ^0.4.24;

import './Reputation.sol';

contract UserCrud is Reputation {

	event NewUser(address user, uint id, string username);

	uint cooldownTime = 2 hours;

	struct User {
	    string name;
	    uint reputation;
	    uint readyTime;
	}

	User[] public users;
	uint totalUserCount = 0;

	mapping (address => uint) public userToId;

	function createUser(string _name) public {
	    require(userToId[msg.sender] == 0);

	    uint id = users.push(User(_name, 0, now)).sub(1);
	    userToId[msg.sender] = id;
		totalUserCount.add(1);

		emit NewUser(msg.sender, id, _name);
	}

	function updateReputation() {

	}
}
