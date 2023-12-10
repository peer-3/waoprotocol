// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GitHubUserStorage {
    event UserAdded(
        address indexed userAddress,
        UserPersonalDetails personalDetails,
        GitHubDetails gitHubDetails,
        string[] publicRepos
    );

    struct GitHubDetails {
        string login;
        uint256 id;
        string node_id;
        string avatar_url;
        string gravatar_id;
        string url;
        string html_url;
        string followers_url;
        string following_url;
        string gists_url;
        string starred_url;
        string subscriptions_url;
        string organizations_url;
        string repos_url;
        uint256 public_repos;
        uint256 public_gists;
        uint256 followers;
        uint256 following;
        uint256 created_at;
        uint256 updated_at;
        uint256 private_gists;
        uint256 total_private_repos;
        uint256 owned_private_repos;
        uint256 disk_usage;
        uint256 collaborators;
        string suspended_at;
        bool business_plus;
        string ldap_dn;
    }

    struct UserPersonalDetails {
        string name;
        string company;
        string blog;
        string location;
        string email;
        bool hireable;
        string bio;
        string twitter_username;
    }

    struct GitHubUser {
        UserPersonalDetails personalDetails;
        GitHubDetails gitHubDetails;
        string[] publicRepos;
    }

    mapping(address => GitHubUser) public githubUsers;
    address[] public allUserAddresses;

    function storeGitHubUser(
        string memory _login,
        uint256 _id,
        string memory _node_id,
        string memory _avatar_url,
        string memory _gravatar_id,
        string memory _url,
        string memory _html_url,
        string memory _followers_url,
        string memory _following_url,
        string memory _gists_url,
        string memory _starred_url,
        string memory _subscriptions_url,
        string memory _organizations_url,
        string memory _repos_url,
        string memory _name,
        string memory _company,
        string memory _blog,
        string memory _location,
        string memory _email,
        bool _hireable,
        string memory _bio,
        string memory _twitter_username,
        uint256 _public_repos,
        uint256 _public_gists,
        uint256 _followers,
        uint256 _following,
        uint256 _created_at,
        uint256 _updated_at,
        uint256 _private_gists,
        uint256 _total_private_repos,
        uint256 _owned_private_repos,
        uint256 _disk_usage,
        uint256 _collaborators,
        string memory _suspended_at,
        bool _business_plus,
        string memory _ldap_dn,
        string[] memory _publicRepos
    ) external {
        GitHubUser storage user = githubUsers[msg.sender];
        user.personalDetails.name = _name;
        user.personalDetails.company = _company;
        user.personalDetails.blog = _blog;
        user.personalDetails.location = _location;
        user.personalDetails.email = _email;
        user.personalDetails.hireable = _hireable;
        user.personalDetails.bio = _bio;
        user.personalDetails.twitter_username = _twitter_username;

        user.gitHubDetails.login = _login;
        user.gitHubDetails.id = _id;
        user.gitHubDetails.node_id = _node_id;
        user.gitHubDetails.avatar_url = _avatar_url;
        user.gitHubDetails.gravatar_id = _gravatar_id;
        user.gitHubDetails.url = _url;
        user.gitHubDetails.html_url = _html_url;
        user.gitHubDetails.followers_url = _followers_url;
        user.gitHubDetails.following_url = _following_url;
        user.gitHubDetails.gists_url = _gists_url;
        user.gitHubDetails.starred_url = _starred_url;
        user.gitHubDetails.subscriptions_url = _subscriptions_url;
        user.gitHubDetails.organizations_url = _organizations_url;
        user.gitHubDetails.repos_url = _repos_url;
        user.gitHubDetails.public_repos = _public_repos;
        user.gitHubDetails.public_gists = _public_gists;
        user.gitHubDetails.followers = _followers;
        user.gitHubDetails.following = _following;
        user.gitHubDetails.created_at = _created_at;
        user.gitHubDetails.updated_at = _updated_at;
        user.gitHubDetails.private_gists = _private_gists;
        user.gitHubDetails.total_private_repos = _total_private_repos;
        user.gitHubDetails.owned_private_repos = _owned_private_repos;
        user.gitHubDetails.disk_usage = _disk_usage;
        user.gitHubDetails.collaborators = _collaborators;
        user.gitHubDetails.suspended_at = _suspended_at;
        user.gitHubDetails.business_plus = _business_plus;
        user.gitHubDetails.ldap_dn = _ldap_dn;

        user.publicRepos = _publicRepos;

        if (!userExists(msg.sender)) {
            allUserAddresses.push(msg.sender);
            emit UserAdded(
                msg.sender,
                user.personalDetails,
                user.gitHubDetails,
                user.publicRepos
            );
        }
    }

    function getUser(
        address userAddress
    ) external view returns (GitHubUser memory) {
        return githubUsers[userAddress];
    }

    function getAllUsers() external view returns (GitHubUser[] memory) {
        GitHubUser[] memory allUsers = new GitHubUser[](
            allUserAddresses.length
        );
        for (uint256 i = 0; i < allUserAddresses.length; i++) {
            allUsers[i] = githubUsers[allUserAddresses[i]];
        }
        return allUsers;
    }

    function userExists(address userAddress) internal view returns (bool) {
        uint256 userId = githubUsers[userAddress].gitHubDetails.id;
        return userId > 0;
    }
}