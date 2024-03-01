// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import necessary modules and libraries
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// DAO Membership Management Contract
contract DAOMembership {
    struct DAOmember {
        bool isRegistered;
    }

    mapping(address => DAOmember) internal daoMembers;

    event ScientistRegistered(address indexed scientist);

     modifier onlyRegisteredMember() {
        require(daoMembers[msg.sender].isRegistered, "You must be a registered DAO member");
        _;
    }

    function registerScientist() external {
        require(!daoMembers[msg.sender].isRegistered, "Already registered as a DAO member");
        daoMembers[msg.sender].isRegistered = true;
        emit ScientistRegistered(msg.sender);
    }
}
