// not deployed

pragma solidity ^0.4.19;

contract User {


// 	event NewUser();

	uint cooldownTime = 2 hours;

	struct User {
	    string name;
	    uint reputation;
	    uint readyTime;
	}

	User[] public users;

	mapping (address => uint) public ownerUserCount;
	mapping (address => uint) public findUserId;

	function _createUser(string _name) public {
	    require(ownerUserCount[msg.sender] == 0);

	    uint id = users.push(User(_name, 0, uint32(now + cooldownTime))) - 1;
	    ownerUserCount[msg.sender] = ownerUserCount[msg.sender] + 1;
	    findUserId[msg.sender] = id;
	}

}
