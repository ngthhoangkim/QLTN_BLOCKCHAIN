// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalContract {
    struct Tenant {
        uint256 rentalId;
        string cccd;
        string phoneNumber;
        string name;
        address tenantAddress;
    }

    mapping(uint256 => Tenant) public rentalContracts; //lưu trữ thông tin hợp đồng cho thuê
    mapping(uint256 => bool) public isRentalContracted; //kiểm tra xem một bài đăng cho thuê đã có hợp đồng cho thuê chưa

    event RentalContractCreated(
        uint256 indexed rentalId,
        string cccd,
        string phoneNumber,
        string name,
        address tenantAddress
    );

    event RentalContractDeleted(uint256 indexed rentalId);
    
    function registerTenant(
        uint256 _rentalId,
        string memory _cccd,
        string memory _phoneNumber,
        string memory _name
    ) public {
        require(
            !isRentalContracted[_rentalId],
            "Contract already exists for this rentalId"
        );

        rentalContracts[_rentalId] = Tenant({
            rentalId: _rentalId,
            cccd: _cccd,
            phoneNumber: _phoneNumber,
            name: _name,
            tenantAddress: msg.sender
        });

        isRentalContracted[_rentalId] = true;

        emit RentalContractCreated(
            _rentalId,
            _cccd,
            _phoneNumber,
            _name,
            msg.sender
        );
    }

    function getRentalContract(
        uint256 _rentalId
    ) public view returns (Tenant memory) {
        require(
            isRentalContracted[_rentalId],
            "No contract exists for this rentalId"
        );
        return rentalContracts[_rentalId];
    }

    function deleteRentalContract(uint256 _rentalId) public {
        require(
            isRentalContracted[_rentalId],
            "No contract exists for this rentalId"
        );
        require(
            rentalContracts[_rentalId].tenantAddress == msg.sender,
            "Only the tenant can delete this contract"
        );

        delete rentalContracts[_rentalId];
        isRentalContracted[_rentalId] = false;

        emit RentalContractDeleted(_rentalId);
    }
}
