// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

contract GithubSnapshot {
    struct RepositorySnapshot {
        address owner;
        string repoName;
        string commitHash;
        uint256 timestamp;
        string htmlUrl;
        string description;
        bool isPrivate;
        uint256 forksCount;
        uint256 watchersCount;
        uint256 size;
        bool hasIssues;
        string branches;
    }



    mapping(bytes32 => RepositorySnapshot) public snapshots;

    event SnapshotCreated(
        bytes32 indexed snapshotId,
        address indexed owner,
        string repoName,
        string commitHash,
        uint256 timestamp
    );

    function createSnapshot(
        address _owner,
        string memory _repoName,
        string memory _commitHash,
        string memory _htmlUrl,
        string memory _description,
        bool _isPrivate,
        uint256 _forksCount,
        uint256 _watchersCount,
        uint256 _size,
        bool _hasIssues,
        string memory _branches
    ) external {
        bytes32 snapshotId = keccak256(
            abi.encodePacked(_owner, _repoName, _commitHash, block.timestamp)
        );

        RepositorySnapshot memory newSnapshot = RepositorySnapshot({
            owner: _owner,
            repoName: _repoName,
            commitHash: _commitHash,
            timestamp: block.timestamp,
            htmlUrl: _htmlUrl,
            description: _description,
            isPrivate: _isPrivate,
            forksCount: _forksCount,
            watchersCount: _watchersCount,
            size: _size,
            hasIssues: _hasIssues,
            branches: _branches
        });

        snapshots[snapshotId] = newSnapshot;

        emit SnapshotCreated(
            snapshotId,
            _owner,
            _repoName,
            _commitHash,
            block.timestamp
        );
    }

    function getSnapshot(
        bytes32 _snapshotId
    )
        external
        view
        returns (
            address owner,
            string memory repoName,
            string memory commitHash,
            uint256 timestamp,
            string memory htmlUrl,
            string memory description,
            bool isPrivate,
            uint256 forksCount,
            uint256 watchersCount,
            uint256 size,
            bool hasIssues,
            string memory branches
        )
    {
        RepositorySnapshot memory snapshot = snapshots[_snapshotId];

        return (
            snapshot.owner,
            snapshot.repoName,
            snapshot.commitHash,
            snapshot.timestamp,
            snapshot.htmlUrl,
            snapshot.description,
            snapshot.isPrivate,
            snapshot.forksCount,
            snapshot.watchersCount,
            snapshot.size,
            snapshot.hasIssues,
            snapshot.branches
        );
    }
}