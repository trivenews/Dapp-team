/* pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import './Challenge.sol';

contract Voting is ChallengeResearcher {
    event conflictOpened(uint conflictId, address claimant, address offender, string description, string evidence);
    event conflictResolved(uint conflictId, address claimant, address offender, bool upheld);

    enum VoteStatus {
        Pending,
        Voting,
        Voted
    }
    struct Conflict {
        address claimant;
        address accused;
        uint createdAt;
        string description;
        string evidence; // IPFS address
        address[] validators;
        VoteStatus status;
        uint8 tally;
        bool upheld;
    }
    Conflict[] conflicts;

    modifier onlyMembers(address _member) {
        require(findUserId[_member] != 0); // from User contract
        _;
    }

    // modifier authorize(address _voter, string _type, uint _id) {
    //     bool authorized;
    //     if (_type == 'conflict') {
    //         require();
    //     } else {
    //         require();
    //     }
    // }

    function openConflict(address _accused, string _description, string _evidence) onlyMembers(msg.sender) {
        conflicts.push(Conflict({
            claimant: msg.sender,
            accused: _accused,
            createdAt: now,
            description: _description,
            evidence: _evidence,
            validators: new address[](0),
            status: VoteStatus.Pending,
            tally: 0,
            upheld: false
        }));
        emit conflictOpened(conflicts.length.sub(1), msg.sender, _accused, _description, _evidence);

        uint conflictId = conflicts.length.sub(1);
        electVerifiers(conflictId);
    }

    function electVerifiers(uint _conflictId) {
        // find verifiers
        // require that the participants role is verifier
    }

    function startVoting() {
        // change the status to open the voting period
    }

    function closeVote() {
        // end the voting period
    }

    function resolveConflict() {
        // take actions to resolve conflict
        // there will need to be some kind of mediator elected
    }

    function getConflict(uint _conflictId) public view returns(Conflict) {
        return conflicts[_conflictId];
    }

} */