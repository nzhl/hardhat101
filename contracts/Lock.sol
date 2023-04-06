// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract Lock is Initializable {
    string constant version = "1.0.0";
    string name;

    function initialize(string calldata _name) public initializer {
        console.log("Initializing Lock contract");
        name = _name;
    }

    function setName(string calldata _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        console.log("Lock@%s Name: %s", version, name);
        return name;
    }
}
