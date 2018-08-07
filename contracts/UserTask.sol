pragma solidity ^0.4.24;

import "./UserCrud.sol";

contract UserTask is UserCreation {
  using SafeMath for uint256;
  event  NewTask(address creator, uint reward);

  enum State { Open, InProgress, Solved, Verified }

  struct Task {
    string	 IPFShash;
    string   IPFShashResearch;
    uint	   reward;
    State    state;
    uint     score;
  }

  Task[] public tasks;
  uint cooldownTime = 2 hours;
  uint totalTasksCount = 0;
  ///mapping to check state
  mapping (uint => uint) public checkState;

  // from creator address to taskid find article count from user.articleCount
  mapping (address => uint) public ownerTaskCount;
  mapping (uint => address) public taskToOwner;
  // researcher of the task
  mapping (uint => address) public taskToResearcher;
  mapping (address => bool) public researcherBusy;
  mapping (address => uint) public researcherToTask;



  function _changeUserInfo(User storage _user) private {
    _user.articleCount = _user.articleCount.add(1);
    _user.reputation = (_user.articleCount.add(_user.researchedArticlesCount)).sub(_user.penaltyCount);
  }

  function _changeResearcherInfo(User storage _researcher) private {
    _researcher.researchedArticlesCount = _researcher.researchedArticlesCount.add(2);
    _researcher.reputation = (_researcher.articleCount.add(_researcher.researchedArticlesCount)).sub(_researcher.penaltyCount);
  }
  // maybe add an "is user" modifier
 function _createTask(string _ipfsHash, uint _reward) public payable {
    /// later we will have to add a minimum value from the msger.
    //create new task id and push to tasks array and taskToOwner
    uint taskId = tasks.push(Task(_ipfsHash, "", _reward, State.Open, 0)).sub(1);
    taskToOwner[taskId] = msg.sender;

    //add task to ownerTaskCount
    ownerTaskCount[msg.sender] = ownerTaskCount[msg.sender].add(1);

    //change user reputation
    uint userId = findUserId[msg.sender];
    User storage me = users[userId];
    _changeUserInfo(me);

    totalTasksCount = totalTasksCount.add(1);

    checkState[0] = checkState[0].add(1);

    // fire event
  // emit NewTask(msg.sender,_ipfsHash, _reward);
  }
  //researcher accepts
  function _acceptTask(uint _taskId) public {
      //check if accepter is a researcher
      require(isResearcher[msg.sender] == true);
      require(researcherBusy[msg.sender] == false);
      require(taskToOwner[_taskId] != msg.sender);

      // set mapping taskId to researcher
      taskToResearcher[_taskId] = msg.sender;
      researcherBusy[msg.sender] = true;
      researcherToTask[msg.sender] = _taskId;
      // change state of the task to InProgress
      checkState[0] = checkState[0].sub(1);
      checkState[1] = checkState[1].add(1);
      Task storage t = tasks[_taskId];
      t.state = State.InProgress;
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
      t.state = State.Solved;
      t.IPFShashResearch = _IPFShashResearch;
      t.score = _score;
  }
  //task creator(user) verifies later this will change to be
  // done by people with the verifier job
  function _verifyTask(uint _taskId) public{
      //temp till we have verifiers
      require(taskToOwner[_taskId] == msg.sender);
      // add articleCount to user and
      //change user reputation
      uint userId = findUserId[msg.sender];
      User storage me = users[userId];
      _changeUserInfo(me);

      // add researchedArticlesCount to researcher and
      //  change user reputation
      address researcherAddress = taskToResearcher[_taskId];
      uint researcherId = findUserId[researcherAddress];
      User storage res = users[researcherId];
      _changeResearcherInfo(res);

      //not sure yet
      checkState[2] = checkState[2].sub(1);
      checkState[3] = checkState[3].add(1);
      Task storage t = tasks[_taskId];
      t.state = State.Verified;
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
  function _getTaskInfo(uint _taskId) external view returns(string, string, uint, State, uint) {
   return (tasks[_taskId].IPFShash, tasks[_taskId].IPFShashResearch, tasks[_taskId].reward, tasks[_taskId].state, tasks[_taskId].score);
  }
}
