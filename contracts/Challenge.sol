pragma solidity ^0.4.24;

import './UserTask.sol';

contract Challenge is UserTask {

  using SafeMath for uint256;

	event NewChallenge();

	struct Challenge {
	    uint taskId;
	    string challengerIPFShash;
	}

	Challenge[] public challenges;

	//to link the old and new research so the witnesses can check it
	mapping (uint => uint) public taskIdToChallengeId;

	mapping (uint => address) public challengeToChallenger;
// 	mapping (uint => address) public taskTochallenger;

	// witness
    mapping (uint => uint) public taskToWitnessAmount;

    mapping (uint => uint) public taskWitnessCount;
    mapping (uint => uint) public taskWitnessSubmitsProChallenger;

    //token transfer functions
    //called if researcher is winner
    // please put your token address inside the braces while testing
    constructor (address tokenAddress) {
        tokenContract = TokenInterface(tokenAddress);
    }

    function _researcherWins(uint _taskId) internal {
        address researcherAddress = taskToResearcher[_taskId];

        //token part
        uint researcherReward = (tasks[_taskId].reward);
        tokenContract.transfer(researcherAddress, researcherReward);

        //reputation part
        uint researcherId = findUserId[researcherAddress];
        users[researcherId].reputation = users[researcherId].reputation.add(4);

        //punish challenger //creates an underflow at the moment
        address challengerAddress = challengeToChallenger[taskIdToChallengeId[_taskId]];
        uint challengerId = findUserId[challengerAddress];
        users[challengerId].reputation = users[challengerId].reputation.sub(4);
    }
    // called if challenger is winner
     function _challengerWins(uint _taskId) internal {
        uint challengeId = taskIdToChallengeId[_taskId];
        address challengerAddress = challengeToChallenger[challengeId];
        tasks[_taskId].IPFShashResearch = challenges[challengeId].challengerIPFShash;
        //token part
        uint challengerReward = (tasks[_taskId].reward);
        tokenContract.transfer(challengerAddress, challengerReward);

        //reputation part
        uint challengerId = findUserId[challengerAddress];
        users[challengerId].reputation = users[challengerId].reputation.add(4);

        //punish researcher //creates an underflow at the moment
        address researcherAddress = taskToResearcher[_taskId];
        uint researcherId = findUserId[researcherAddress];
        users[researcherId].reputation = users[researcherId].reputation.sub(2);
    }

    //later only verifier modifier
    function challengeResearcher(uint _taskId, string _ipfsHash) public {
        // Security check if th requester is a verifier
	    // require(checkIfUserIsVerifier[msg.sender] == true, "you are not a verifier yet");
        //create new task id and push to tasks array and taskToOwner
        uint challengeId = challenges.push(Challenge(_taskId, _ipfsHash)).sub(1);
        challengeToChallenger[challengeId] = msg.sender;
        taskIdToChallengeId[_taskId] = challengeId;

	    //add task to ownerTaskCount
	    ownerTaskCount[msg.sender] = ownerTaskCount[msg.sender].add(1);
        //change state from
        checkState[3] = checkState[3].sub(1);
        checkState[4] = checkState[4].add(1);
        tasks[_taskId].state = State.InWitness;

        taskToWitnessAmount[_taskId] = 3; //11, later witnessamount

	    // fire event
	    emit NewChallenge();
    }

    //later add modifier to check onlyWitness, state of the task(has to be 4, verifySubmitted)
    function witnessChallenge(uint _taskId, bool _voteForChallenger) public {
        require(taskWitnessCount[_taskId] < taskToWitnessAmount[_taskId]);
        if(_voteForChallenger == true) {
            taskWitnessSubmitsProChallenger[_taskId] = taskWitnessSubmitsProChallenger[_taskId].add(1);
        }
	    //add task to ownerTaskCount
	    taskWitnessCount[_taskId] = taskWitnessCount[_taskId].add(1);
        //select winner and change state to verified
        if (taskToWitnessAmount[_taskId] == taskWitnessCount[_taskId]) {
            _checkWinner(_taskId);
        }
    }

    function _checkWinner(uint _taskId) internal {
        tasks[_taskId].state = State.Verified;
        checkState[4] = checkState[4].sub(1);
        checkState[5] = checkState[5].add(1);
        //change user reputation
        address creatorAddress = taskToOwner[_taskId];
        uint creatorId = findUserId[creatorAddress];
        _changeUserInfo(creatorId);
        //later to will be 5, and after that will depend on how much is requested
        if (taskWitnessSubmitsProChallenger[_taskId] >= 2) {
            _challengerWins(_taskId);
        } else {
            _researcherWins(_taskId);
        }
    }
}