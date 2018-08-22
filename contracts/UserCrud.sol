// not deployed

pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import './Reputation.sol';
//token contract
contract TokenInterface{
  function totalSupply() public constant returns (uint);
  function balanceOf(address tokenOwner) public constant returns (uint balance);
  function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
  function transfer(address to, uint tokens) public returns (bool success);
  function approve(address spender, uint tokens) public returns (bool success);
  function transferFrom(address from, address to, uint tokens) public returns (bool success);

  event Transfer(address indexed from, address indexed to, uint tokens);
  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

}
contract UserCreation is Reputation {

  using SafeMath for uint256;

	event NewUser(address user, uint id, string username);

	enum Rank { User, Witness, Researcher, Verifier }

	struct User {
	    string name;
	    uint reputation;
	    uint readyTime;
	    Rank rank;
	}

	User[] public users;
	uint totalUserCount = 0;

	mapping (address => uint) public ownerUserCount;
	mapping (address => uint) public findUserId;
	//check role
	mapping (address => bool) public checkIfUserIsWitness;
	mapping (address => bool) public checkIfUserIsResearcher;
	mapping (address => bool) public checkIfUserIsVerifier;

  TokenInterface public tokenContract;

  // please put your token address inside the braces while testing
  constructor() {
    tokenContract = TokenInterface(0x288d6875ae8da04afc5943b7c19db62092a33389);
  }
	function createUser(string _name) public {
	    //check if owner already has an account
	    require(ownerUserCount[msg.sender] == 0);

	    //create new User
	    uint id = users.push(User(_name, 0, uint32(now), Rank.User)).sub(1);

	    //add user to owner to user count mapping
	    ownerUserCount[msg.sender] = ownerUserCount[msg.sender].add(1);

	    // add user id to find user by address mapping
	    findUserId[msg.sender] = id;

	    //add one to total users
	    totalUserCount = totalUserCount.add(1);

	    //for event new user
	    emit NewUser(msg.sender, id, _name);
	}

	// test function to ugrade rank
	function createWitness() public {
	    // Security
	    require(ownerUserCount[msg.sender] == 1);
	    //look up id and change to rank Witness
	    users[findUserId[msg.sender]].rank = Rank.Witness;
	    checkIfUserIsWitness[msg.sender] = true;
	}
	function createResearcher() public {
	    // Security
	    require(ownerUserCount[msg.sender] == 1);
	    //look up id and change to rank researcher
	    users[findUserId[msg.sender]].rank = Rank.Researcher;
	    checkIfUserIsResearcher[msg.sender] = true;
	}
	function createVerifier() public {
	    // Security
	    require(ownerUserCount[msg.sender] == 1);
	    //look up id and change to rank verifier
	    users[findUserId[msg.sender]].rank = Rank.Verifier;
	    checkIfUserIsVerifier[msg.sender] = true;
	}
	// end test funtions
    function findUserInfo() public view returns(string, uint, uint, Rank){
	    // So you can only request you own info
	    require(ownerUserCount[msg.sender] == 1);
	    //look up id
	    uint id = findUserId[msg.sender];
	    //return requested info
	    return (users[id].name, users[id].reputation, users[id].readyTime, users[id].rank);
	}

	function _getToatalUserCount() public view returns(uint) {
	    return totalUserCount;
	}
}
