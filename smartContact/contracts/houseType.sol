// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HouseTypeManager {
    struct HouseType {
        uint256 id;
        string name;
    }

    mapping(uint256 => HouseType) private houseTypes;
    uint256[] private houseTypeIds;
    uint256 private nextId = 1;

    event HouseTypeAdded(uint256 id, string name);
    event HouseTypeUpdated(uint256 id, string name);
    event HouseTypeDeleted(uint256 id);

    function addHouseType(string memory _name) public {
        houseTypes[nextId] = HouseType(nextId, _name);
        houseTypeIds.push(nextId);
        emit HouseTypeAdded(nextId, _name);
        nextId++;
    }

    function updateHouseType(uint256 _id, string memory _name) public {
        require(bytes(houseTypes[_id].name).length > 0, "House type does not exist");
        houseTypes[_id].name = _name;
        emit HouseTypeUpdated(_id, _name);
    }

    function deleteHouseType(uint256 _id) public {
        require(bytes(houseTypes[_id].name).length > 0, "House type does not exist");
        delete houseTypes[_id];

        for (uint256 i = 0; i < houseTypeIds.length; i++) {
            if (houseTypeIds[i] == _id) {
                houseTypeIds[i] = houseTypeIds[houseTypeIds.length - 1];
                houseTypeIds.pop();
                break;
            }
        }

        emit HouseTypeDeleted(_id);
    }

    function getHouseType(uint256 _id) public view returns (string memory) {
        require(bytes(houseTypes[_id].name).length > 0, "House type does not exist");
        return houseTypes[_id].name;
    }

    function getAllHouseTypes() public view returns (HouseType[] memory) {
        HouseType[] memory allHouseTypes = new HouseType[](houseTypeIds.length);
        for (uint256 i = 0; i < houseTypeIds.length; i++) {
            allHouseTypes[i] = houseTypes[houseTypeIds[i]];
        }
        return allHouseTypes;
    }
}
