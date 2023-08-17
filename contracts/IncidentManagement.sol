// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IncidentManagement {
    enum Severity { Low, Medium, High }
    enum Status { Reported, InProgress, Resolved }

    struct Incident {
        uint256 id;
        string description;
        address reporter;
        Severity severity;
        Status status;
    }

    uint256 public incidentCount;
    mapping(uint256 => Incident) public incidents;

    event IncidentReported(uint256 indexed id, address indexed reporter, string description, Severity severity);
    event IncidentStatusUpdated(uint256 indexed id, Status status);

    constructor() {
        incidentCount = 0;
    }

    function reportIncident(string memory _description, Severity _severity) external {
        incidentCount++;
        incidents[incidentCount] = Incident(incidentCount, _description, msg.sender, _severity, Status.Reported);
        emit IncidentReported(incidentCount, msg.sender, _description, _severity);
    }

    function updateIncidentStatus(uint256 _id, Status _status) external {
        require(incidents[_id].id != 0, "Incident does not exist");
        require(msg.sender == incidents[_id].reporter, "Only reporter can update status");
        incidents[_id].status = _status;
        emit IncidentStatusUpdated(_id, _status);
    }
}
