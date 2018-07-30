pragma solidity ^0.4.24;

import "./UserCrud.sol";

contract UserTask is UserCreation {
  using SafeMath for uint256;
  event  NewTask(address creator, uint reward);

  enum State { Open, InProgress, Solved, Verified }

  struct Task {
      string	 IPFShash;
      string   IPFShashResearch;
    uint	 reward;
    State    state;
    uint     score;
  }
  //NEW - karen update
  // address[] public tasksAccts;
  Task[] public tasks;
  uint cooldownTime = 2 hours;
  uint totalTasksCount = 0;
  ///mapping to check state
  mapping (uint => uint) public checkState;

  //NEW mapping for alltasks
  // mapping(address => Task) public allTasks;
  // mapping (uint => uint) public lookupTasksByGenre;

  // from creator address to taskid find article count from user.articleCount
  mapping (address => uint) public ownerTaskCount;
  mapping (uint => address) public taskToOwner;
  // researcher of the task
  mapping (uint => address) public taskToResearcher;



  function _changeUserInfo(User storage _user) private {
      _user.articleCount = _user.articleCount.add(1);
      _user.reputation = (_user.articleCount.add(_user.researchedArticlesCount)).sub(_user.penaltyCount);
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
      //  tasksAccts.push(msg.sender) - 1;
      //  var task = allTasks[msg.sender];
      //  task.IPFShash = _ipfsHash;
      //  task.reward = _reward;

    // fire event
  // emit NewTask(msg.sender,_ipfsHash, _reward);
  }


  //function gettasks by address list
  // function getTasks() view public returns(address[]){
  //     return tasksAccts;
  // }

  // //get individual task by address
  // function getIndividualTask(address _address) view public returns(string, uint) {
  //     return (allTasks[_address].IPFShash, allTasks[_address].reward );
  // }

  //researcher accepts
  function _acceptTask(uint _taskId) public {
      //check if accepter is a researcher
      require(isResearcher[msg.sender] == true);
      // set mapping taskId to researcher
      taskToResearcher[_taskId] = msg.sender;
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
      // change state of the task to solved and add ipfs hash
      checkState[1] = checkState[1].sub(1);
      checkState[2] = checkState[2].add(1);
      Task storage t = tasks[_taskId];
      t.state = State.Solved;
      t.IPFShashResearch = _IPFShashResearch;
      t.score = _score;
  }

  //get total amount of tasks
  function getTotalTasksCount() public view returns(uint) {
      return totalTasksCount;
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



/* pragma solidity ^0.4.19;

import "./UserCrud.sol";

contract UserTask is UserCrud {


    struct Task {
        string	IPFShash;
		uint    reward;
    }

    Task[] public tasks;

    mapping (uint => uint) public lookupTasksByGenre;
    mapping (uint => uint) public taskToCreator;


    function _createTask(string _ipfsHash, uint _reward) public {
        uint taskId = tasks.push(Task(_ipfsHash, _reward));
    }

} */
