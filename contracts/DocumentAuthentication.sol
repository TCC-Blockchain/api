// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract DocumentAuthentication {
    mapping(bytes32 => bool) private hashes;

    mapping(uint256 => ContractItem) private contracts;

    struct ContractItem {
      bytes32 hash;
      address owner;
    }

    function storeHash(bytes32 hash) public {
        require(!hashes[hash], "Hash already stored");
        hashes[hash] = true;
    }

    function verifyHash(bytes32 hash) public view returns (bool) {
        return hashes[hash];
    }
}
