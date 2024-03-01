// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "contracts/DAOMembership.sol";
import "contracts/Scimedal.sol";

// Research Paper Funding Contract
contract ResearchPaperFunding is DAOMembership, SciMedal {

    struct ResearchPaper {
        string name;
        string description;
        address uploader;
        address[] contributors;
        string[] ipfsHash;
        bool isLocked;
        uint256 totalFunding;
        mapping(address => uint256) investorFunds;
        uint8 peerReviewScores;
        string[] feedback;
        uint8 peerReviewCount; // Counter for the number of peer reviews
        bool isCompleted; // Flag indicating whether the paper is completed
    }

    struct Contribution {
        string ipfsHash;
        address contributor;
    }

    mapping (uint256 => Contribution[]) internal requestedContributors;
    mapping(uint256 => ResearchPaper) internal researchPapers;
    mapping(uint256 => address) internal paperOwners;

    event ResearchPaperFunded(uint256 indexed paperId, address indexed investor, uint256 amount);
    event FundsWithdrawn(uint256 indexed paperId, address indexed uploader, uint256 amount);
    event ContributionRequested(uint256 indexed paperId, address indexed contributor, string ipfsHash);
    event ContributionAccepted(uint256 indexed paperId, address indexed uploader, address indexed contributor, string ipfsHash);


    modifier onlyOwnerOf(uint256 paperId) {
        require(msg.sender == paperOwners[paperId], "You don't own this research paper");
        _;
    }

     constructor() SciMedal(msg.sender) {}


    // Function for investors to fund a research paper
    function fundResearchPaper(uint256 paperId) external payable {
        ResearchPaper storage paper = researchPapers[paperId];

    // Security check: Ensure that the specified paperId exists
        require(paper.uploader != address(0), "Invalid paperId");

        require(!paper.isLocked, "Research paper is not available for funding");
        require(!paper.isCompleted, "Research paper is completed so no more need for funding");
        require(msg.value > 0, "Funding amount must be greater than zero"); // Ensure amount is greater than zero

        uint256 amount = msg.value;

        paper.totalFunding += amount;
        paper.investorFunds[msg.sender] += amount;

        emit ResearchPaperFunded(paperId, msg.sender, amount);
    }




    // Function to withdraw total funds by the uploader
function withdrawFunds(uint256 paperId) external {
    ResearchPaper storage paper = researchPapers[paperId];
    require(msg.sender == paper.uploader, "You are not the uploader of this research paper");
    require(!paper.isCompleted, "Research paper is already completed");

    uint256 totalFunding = paper.totalFunding;

    require(totalFunding > 0, "No funds available for withdrawal");

    // Calculate 50% of the total funding
    uint256 contributorShare = totalFunding / 2;

    // Calculate the share each contributor will receive
    uint256 individualShare = contributorShare / paper.contributors.length;

    // Transfer funds to each contributor
    for (uint256 i = 0; i < paper.contributors.length; i++) {
        address contributor = paper.contributors[i];
        paper.investorFunds[contributor] += individualShare;
        payable(contributor).transfer(individualShare);
        safeMint(contributor, paper.name);
    }

    // Transfer the remaining 50% to the uploader
    uint256 uploaderShare = totalFunding - contributorShare;
    paper.investorFunds[msg.sender] += uploaderShare;
    payable(msg.sender).transfer(uploaderShare);
    safeMint(msg.sender, paper.name);

    // Reset total funding for the paper to avoid reentrancy
    paper.totalFunding = 0;
    paper.isCompleted = true; // Mark the paper as completed

    emit FundsWithdrawn(paperId, msg.sender, totalFunding);
}


    // Function for contributors to request contributing to a research paper
    function requestToContribute(uint256 paperId, string memory _ipfsHash) external onlyRegisteredMember {
        ResearchPaper storage paper = researchPapers[paperId];

        require(!paper.isLocked, "Research paper is not available for contributions");
        require(msg.sender != paper.uploader, "Uploader cannot request contribution to their own paper");

        Contribution memory newContribution = Contribution({
            ipfsHash: _ipfsHash,
            contributor: msg.sender
        });

        requestedContributors[paperId].push(newContribution);
        emit ContributionRequested(paperId, msg.sender, _ipfsHash);
    }

    // Function for the uploader to accept contributions
    function acceptContribution(uint256 paperId, uint256 contributionIndex) external onlyOwnerOf(paperId) {
        ResearchPaper storage paper = researchPapers[paperId];

        require(!paper.isLocked, "Research paper is not available for contributions");
        require(contributionIndex < requestedContributors[paperId].length, "Invalid contribution index");

        Contribution storage contribution = requestedContributors[paperId][contributionIndex];

        // Add contributor to ResearchPaper contributors array
        paper.contributors.push(contribution.contributor);
        // Add ipfsHash to ResearchPaper ipfsHash array
        paper.ipfsHash.push(contribution.ipfsHash);

        // Emit ContributionAccepted event
        emit ContributionAccepted(paperId, msg.sender, contribution.contributor, contribution.ipfsHash);

        // Remove the accepted contribution from the requestedContributors array
        if (contributionIndex < requestedContributors[paperId].length - 1) {
            requestedContributors[paperId][contributionIndex] = requestedContributors[paperId][requestedContributors[paperId].length - 1];
        }
        requestedContributors[paperId].pop();
    }
}