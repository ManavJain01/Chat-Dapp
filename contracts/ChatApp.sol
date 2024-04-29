

// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract ChatApp{

  //USER STRUCT
  struct user{
    string name;
    friend[] friendList;
  }

  struct friend{
    address pubkey;
    string name;
  }

  struct message{
    address sender;
    uint256 timestamp;
    string msg;
  }

  mapping(address => user) userList;
  mapping(bytes32 => message[]) allMessages;

  //CHECK USER EXIST
  function checkUserExists(address pubkey) public view returns(bool){
    return bytes(userList[pubkey].name).length > 0;
  }

  //CREATE ACCOUNT
  function createAccount(string calldata name) external {
    require(checkUserExists(msg.sender) == false, "User already exists");

    userList[msg.sender].name = name;
  }
}