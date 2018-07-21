pragma solidity ^0.4.24;
// pragma experimental ABIEncoderV2;

import './Reputation.sol';

contract Vote is Reputation {
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
        require(users[_address]); // from User contract
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
        Conflict storage conflict = Conflict({
            claimant: msg.sender,
            accused: _accused,
            createdAt: now,
            description: _description,
            evidence: _evidence,
            status: VoteStatus.Pending,
            tally: 0,
            approved: false
        });
        conflicts.push(conflict);
        emit conflictOpened(conflicts.length.sub(1), msg.sender, _accused, _description, _evidence);
        
        uint32 conflictId = conflicts.length - 1;
        electVerifiers(conflictId);
    }

    function electVerifiers(uint32 _conflictId) {
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

}

