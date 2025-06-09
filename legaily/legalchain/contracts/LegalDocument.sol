// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LegalDocument {
    string public documentHash;
    address public owner;

    constructor(string memory _hash) {
        documentHash = _hash;
        owner = msg.sender;
    }

    function updateDocument(string memory _newHash) public {
        require(msg.sender == owner, "Only owner can update");
        documentHash = _newHash;
    }
}
