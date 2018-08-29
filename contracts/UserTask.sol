pragma solidity ^0.4.24;

import "./UserCrud.sol";

contract UserTask is UserCreation {
  using  SafeMath for uint256;
  event  NewTask(uint taskId, uint reward);

  enum State { Open, InResearch, ResearchSubmitted, InVerify, InWitness, Verified }

  struct Task {
    string	    IPFShash;
    string      IPFShashResearch;
  	uint	      reward;
    State       state;
  	uint        score;
  }

  Task[] public tasks;
  uint cooldownTime = 2 hours;
  ///mapping to check state
  mapping (uint => uint) public checkState;
  // from creator address to taskid find article count from user.articleCount
  mapping (address => uint) public ownerTaskCount;
  mapping (uint => address) public taskToOwner;
  // researcher of the task
  mapping (uint => address) public taskToResearcher;
  mapping (address => bool) public researcherBusy;
  mapping (address => uint) public researcherToTask;
  // verifying of task
  mapping (uint => address) public taskToVerifier;
  mapping (address => bool) public verifierBusy;
  mapping (address => uint) public verifierToTask;

  //modifier
  modifier onlyTrive(uint _reward) {
      require(tokenContract.allowance(msg.sender, this) >= _reward, "Please allow Trive to spent more TRV");
      _;
  }

  //token transfer functions
  function _claimMoneyResearcher(uint _taskId, address _researcherAddr) internal {
      uint researcherReward = (tasks[_taskId].reward) / 2;
      tokenContract.transfer(_researcherAddr, researcherReward);
  }
   function _claimMoneyVerifier(uint _taskId) internal {
      uint verifierReward = (tasks[_taskId].reward) / 2;
      tokenContract.transfer(msg.sender, verifierReward);
  }
  // end token transfer functions
  function _changeUserInfo(uint _userId) internal {
      users[_userId].reputation = users[_userId].reputation.add(1);
  }
  function _changeResearcherInfo(uint _researcherId) private {
      users[_researcherId].reputation = users[_researcherId].reputation.add(2);
  }
  function _changeVerifierInfo(uint _verifierId) private {
      users[_verifierId].reputation = users[_verifierId].reputation.add(2);
  }

  // maybe add an "is user" modifier
 function _createTask(string _ipfsHash, uint _reward) public {
      /// later we will have to add a minimum value from the msger.
      // Security check if th requester is a user
    require(ownerUserCount[msg.sender] == 1, "you are not a user");
    require(_reward % 2 == 0, "Even value required.");
    //transfer TRV tokens to this contract from the task creator
    require(tokenContract.transferFrom(msg.sender, this, _reward));
    //create new task id and push to tasks array and taskToOwner
    uint taskId = tasks.push(Task(_ipfsHash, "", _reward, State.Open, 0)).sub(1);
    taskToOwner[taskId] = msg.sender;

    //add task to ownerTaskCount
    ownerTaskCount[msg.sender] = ownerTaskCount[msg.sender].add(1);

      checkState[0] = checkState[0].add(1);

    // fire event
    emit NewTask(taskId, _reward);
  }

  //researcher accepts
  function _acceptTask(uint _taskId) public {
      //check if accepter is a researcher
      require(checkIfUserIsResearcher[msg.sender] == true || checkIfUserIsVerifier[msg.sender] == true);
      require(researcherBusy[msg.sender] == false && taskToOwner[_taskId] != msg.sender);
      // set mapping taskId to researcher
      taskToResearcher[_taskId] = msg.sender;
      researcherBusy[msg.sender] = true;
      researcherToTask[msg.sender] = _taskId;
      // change state of the task to InProgress
      checkState[0] = checkState[0].sub(1);
      checkState[1] = checkState[1].add(1);
      tasks[_taskId].state = State.InResearch;
  }
  // researcher submits
  function _submitTask(uint _taskId, string _IPFShashResearch, uint _score) public {
      //check if submitter is the researcher linked to the task
      require(taskToResearcher[_taskId] == msg.sender);
      researcherBusy[msg.sender] = false;
      // change state of the task to solved and add ipfs hash
      checkState[1] = checkState[1].sub(1);
      checkState[2] = checkState[2].add(1);
      Task storage t = tasks[_taskId];
      t.state = State.ResearchSubmitted;
      t.IPFShashResearch = _IPFShashResearch;
      t.score = _score;
  }
  // done by people with the verifier job
  function _acceptVerifyTask(uint _taskId) public {
      //security
      require(checkIfUserIsVerifier[msg.sender] == true
      && verifierBusy[msg.sender] == false
      && taskToOwner[_taskId] != msg.sender
      && taskToResearcher[_taskId] != msg.sender);
      // set mapping taskId to verifier
      taskToVerifier[_taskId] = msg.sender;
      verifierBusy[msg.sender] = true;
      verifierToTask[msg.sender] = _taskId;
      // change state of the task to InVerify
      checkState[2] = checkState[2].sub(1);
      checkState[3] = checkState[3].add(1);
      tasks[_taskId].state = State.InVerify;
  }

  // done by people with the verifier job
  function _verifyTask(uint _taskId) public{
    // security
    require(taskToVerifier[_taskId] == msg.sender);
    // update verifier busy
    verifierBusy[msg.sender] = false;
    //change user reputation
    address creatorAddress = taskToOwner[_taskId];
    uint creatorId = findUserId[creatorAddress];
    _changeUserInfo(creatorId);
    //change researcher reputation
    address researcherAddress = taskToResearcher[_taskId];
    uint researcherId = findUserId[researcherAddress];
    _changeResearcherInfo(researcherId);
    _claimMoneyResearcher(_taskId, researcherAddress);
  //change verifier reputation
  uint verifierId = findUserId[msg.sender];
    _changeVerifierInfo(verifierId);
    _claimMoneyVerifier(_taskId);
    // change state of the task to verified
    checkState[3] = checkState[3].sub(1);
    checkState[5] = checkState[5].add(1);
    tasks[_taskId].state = State.Verified;
    tasks[_taskId].reward = 0;
  }

  //get total amount of tasks by state
  function getTasksCountByState(uint _num) public view returns(uint) {
    return checkState[_num];
  }
  // so a user can easaly see the answers to the tasks he/she/it created
  function _getTasksByOwner(address _owner) external view returns(uint[]) {
    //declaration of short term array
    uint[] memory result = new uint[](ownerTaskCount[msg.sender]);
    uint counter = 0;
    for (uint i = 0; i < tasks.length; i++) {
      if (taskToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
  function _getTasksByState(State _state, uint _num) external view returns(uint[]) {
    //declaration of short term array
    uint[] memory result = new uint[](checkState[_num]);
    uint counter = 0;
    for (uint i = 0; i < tasks.length; i++) {
      if (tasks[i].state == _state) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
