pragma solidity ^0.4.19;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract UserCreation {

  using SafeMath for uint256;

	event NewUser(address user, uint id, string username);

	uint cooldownTime = 2 hours;

	struct User {
	    string name;
	    uint reputation;
	    uint articleCount;
	    uint panaltyCount;
	    uint readyTime;
	    bool busyResearcher;
	}

	User[] public users;
	uint totalUserCount = 0;
	
	//count the users linked to given address
	mapping (address => uint) public ownerUserCount;
	//from address to User id
	mapping (address => uint) public findUserId;
	//check address if it's a researcher
	mapping (address => bool) public isResearcher;

	function _createUser(string _name) public {
	    //check if owner already has an account
	    require(ownerUserCount[msg.sender] == 0);

	    //create new User
	    uint id = users.push(User(_name, 0, 0, 0, uint32(now), false)).sub(1);

	    //add user to owner to user count mapping
	    ownerUserCount[msg.sender] = ownerUserCount[msg.sender].add(1);

	    //add user to is researcher mapping
	    isResearcher[msg.sender] = false;

	    // add user id to find user by address mapping
	    findUserId[msg.sender] = id;
	    totalUserCount = totalUserCount.add(1);

	    //for event new user
	    emit NewUser(msg.sender, id, _name);
	}

	function _findUserInfo() public view returns(string, uint, uint, uint, uint, bool){
	    // So you can only request you own info
	    require(ownerUserCount[msg.sender] == 1);
	    //look up id
	    uint id = findUserId[msg.sender];
	    //return requested info
	    return (users[id].name, users[id].reputation, users[id].articleCount, users[id].panaltyCount, users[id].readyTime, users[id].busyResearcher);
	}

	function _getToatalUserCount() public view returns(uint) {
	    return totalUserCount;
	}

}


/* pragma solidity ^0.4.24;

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
} */
