// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/ResearchPaperFunding.sol";

// Research Paper Management Contract
contract ResearchPaperManagement is ResearchPaperFunding {

    uint256 public paperCounter;
    uint256[] public allPaperIds; // Array to store all uploaded paper IDs

    event ResearchPaperUploaded(uint256 indexed paperId, address indexed uploader, string ipfsHash);
    event ResearchPaperPurchased(uint256 indexed paperId, address indexed buyer);
    event ResearchPaperPeerReviewed(uint256 indexed paperId, address indexed reviewer, uint8 score, string feedback);
    event ResearchPaperPublished(uint256 indexed paperId);

    modifier onlyNotPaperOwner(uint256 paperId) {
        require(paperOwners[paperId] != msg.sender, "Paper owner cannot perform this action");
        _;
    }

    // Function to upload a new research paper
    function uploadResearchPaper(string memory name, string memory _desc, string memory _ipfsHash) external onlyRegisteredMember {
        paperCounter++;
        uint256 paperId = paperCounter;
        
        ResearchPaper storage paper = researchPapers[paperId];
        paper.name = name;
        paper.description = _desc;
        paper.uploader = msg.sender;
        paper.ipfsHash.push(_ipfsHash);
        paper.isLocked = true;

        paperOwners[paperId] = msg.sender;
        allPaperIds.push(paperId); // Add the paper ID to the array

        emit ResearchPaperUploaded(paperId, msg.sender, _ipfsHash);
    }

    // Function to toggle the lock status of a research paper
    function toggleLockStatus(uint256 paperId, bool newStatus) internal {
        researchPapers[paperId].isLocked = newStatus;
    }

    // Function to peer review a research paper
    function peerReviewResearchPaper(uint256 paperId, uint8 score, string memory _feedback)
        external
        onlyRegisteredMember
        onlyNotPaperOwner(paperId)
    {
        ResearchPaper storage paper = researchPapers[paperId];

        require(score >= 1 && score <= 10, "Invalid score. Score must be between 1 and 10");

        paper.peerReviewScores += score ;
        paper.feedback.push(_feedback);  // Push the feedback into the feedback array

        emit ResearchPaperPeerReviewed(paperId, msg.sender, score, _feedback);

        // Increment peer review count
        paper.peerReviewCount++;

        // Check if the required number of peer reviews is reached
        if (paper.peerReviewCount >= 5) {
            toggleLockStatus(paperId, false);
            emit ResearchPaperPublished(paperId);
        }
    }

    // Function to get details of a research paper
    function getResearchPaperDetails(uint256 paperId)
        external
        view
        returns (
            string memory name,
            string memory description,
            address uploader,
            string[] memory ipfsHash,
            address[] memory contributors,
            bool isLocked,
            uint totalFunding,
            bool isCompleted,
            uint peerReviewScores,
            string[] memory feedback,
            uint8 peerReviewCount
        )
    {
        ResearchPaper storage paper = researchPapers[paperId];
        return (
            paper.name,
            paper.description,
            paper.uploader,
            paper.ipfsHash,
            paper.contributors,
            paper.isLocked,
            paper.totalFunding,
            paper.isCompleted,
            paper.peerReviewScores,
            paper.feedback,
            paper.peerReviewCount
        );
    }

    // Function to get all uploaded paper IDs
    function getAllPaperIds() external view returns (uint256[] memory) {
        return allPaperIds;
    }
}
