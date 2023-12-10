// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedGithubRegistry {
    struct Build {
        string branch;
        string commitMessage;
        string commitHash;
        string cid; // Content Identifier, e.g., IPFS hash
    }

    struct Repository {
        uint256 repoId;
        string name;
        string fullname;
        string description;
        address ownerId;
        uint256 size;
        string defaultBranch;
        string[] topics;
        string language;
    }

    event NewBuildCreated(
        Repository repository,
        Build build
    );

    address private owner;

    mapping(uint256 => Repository) public repositories;
    uint256 public repoCount;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not an owner");
        _;
    }

    // Register a new repository.
    function registerRepository(
        string memory name,
        string memory fullname,
        string memory description,
        uint256 size,
        string memory defaultBranch,
        string[] memory topics,
        string memory language
    ) public returns (uint256) {
        repoCount++;
        Repository memory newRepo = Repository({
            repoId: repoCount,
            name: name,
            fullname: fullname,
            description: description,
            ownerId: msg.sender,
            size: size,
            defaultBranch: defaultBranch,
            topics: topics,
            language: language
        });

        repositories[repoCount] = newRepo;

        return repoCount;
    }

    // Create a new build for a specific repository.
    function createBuild(
        uint256 repoId,
        string memory branch,
        string memory commitMessage,
        string memory commitHash,
        string memory cid
    ) public {
        require(repoId <= repoCount, "Invalid repoId");
        require(repositories[repoId].ownerId != address(0), "Invalid repository");

        Build memory newBuild = Build({
            branch: branch,
            commitMessage: commitMessage,
            commitHash: commitHash,
            cid: cid
        });

        emit NewBuildCreated(repositories[repoId], newBuild);
    }

    // Transfer ownership of the contract to a different address.
    function delegateOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}
