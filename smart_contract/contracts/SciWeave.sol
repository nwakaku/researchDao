// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "contracts/DAOMembership.sol";
import "contracts/ResearchPaperManagement.sol";

// Main ResearchDao Contract
contract ResearchDao is DAOMembership, ResearchPaperManagement {
    // This contract is left empty as it only serves as a composition of the DAOMembership and ResearchPaperManagement contracts.
    // All the functionality is inherited from those contracts.
    function getAllResearchPapersByAddress()
        external
        view
        returns (uint256[] memory paperIds)
    {
        uint256 totalPapers = paperCounter;
        uint256 count = 0;

        // Count the number of papers owned or uploaded by the given address
        for (uint256 i = 1; i <= totalPapers; i++) {
            ResearchPaper storage paper = researchPapers[i];
            if (paper.uploader == msg.sender || paperOwners[i] == msg.sender) {
                count++;
            }
        }

        // Populate the paperIds array
        paperIds = new uint256[](count);
        count = 0;
        for (uint256 i = 1; i <= totalPapers; i++) {
            ResearchPaper storage paper = researchPapers[i];
            if (paper.uploader == msg.sender || paperOwners[i] == msg.sender) {
                paperIds[count] = i;
                count++;
            }
        }

        return paperIds;
    }
}
