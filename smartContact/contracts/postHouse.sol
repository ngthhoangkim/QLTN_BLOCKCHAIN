// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RentalListing {
    enum RentalStatus {
        Pending,
        Available,
        Rented
    }

    struct Rental {
        uint256 userId;
        string username;
        uint256 price;
        string houseType;
        string addressLocation;
        string contactNumber;
        uint8 bedrooms;
        uint8 bathrooms;
        uint256 width;
        uint256 length;
        string description;
        string[] imageUrls;
        RentalStatus status;
    }

    struct RentalInput {
        uint256 userId;
        string username;
        uint256 price;
        string houseType;
        string addressLocation;
        string contactNumber;
        uint8 bedrooms;
        uint8 bathrooms;
        uint256 width;
        uint256 length;
        string description;
        string[] imageUrls;
        // bool furnished;
    }

    uint256 public nextRentalId;
    mapping(uint256 => Rental) public rentals; //lưu danh sách bài đăng
    mapping(uint256 => uint256) public rentalToUser; //Ánh xạ rentalId đến userId, giúp xác định chủ sở hữu của bài đăng.

    event RentalListed(
        uint256 indexed rentalId,
        uint256 indexed userId,
        string username,
        uint256 price,
        string houseType
    );

    event RentalStatusUpdated(uint256 indexed rentalId, RentalStatus status);

    function listRental(RentalInput memory input) public {
        rentals[nextRentalId] = Rental({
            userId: input.userId,
            username: input.username,
            price: input.price,
            houseType: input.houseType,
            addressLocation: input.addressLocation,
            contactNumber: input.contactNumber,
            bedrooms: input.bedrooms,
            bathrooms: input.bathrooms,
            width: input.width,
            length: input.length,
            description: input.description,
            imageUrls: input.imageUrls,
            status: RentalStatus.Pending 
        }); // furnished: input.furnished 

        rentalToUser[nextRentalId] = input.userId;
        emit RentalListed(
            nextRentalId,
            input.userId,
            input.username,
            input.price,
            input.houseType
        );  //input.furnished
        nextRentalId++;
    }

    function getRental(uint256 _rentalId) public view returns (Rental memory) {
        require(_rentalId < nextRentalId, "Invalid rental ID"); //kiểm tra xem id hợp lệ không
        return rentals[_rentalId];
    }

    function getAllRentals() public view returns (Rental[] memory) { 
        //Khởi tạo một mảng mới có độ dài bằng số bài đăng cho thuê hiện tại (dựa vào nextRentalId).
        Rental[] memory allRentals = new Rental[](nextRentalId);
        for (uint256 i = 0; i < nextRentalId; i++) {
            allRentals[i] = rentals[i];
        }
        return allRentals;
    }

    function updateRentalStatus(
        uint256 _rentalId,
        RentalStatus _status,
        uint256 _userId
    ) public {
        require(_rentalId < nextRentalId, "Invalid rental ID");
        require(
            _userId == rentalToUser[_rentalId],
            "Only the owner can update status"
        );

        Rental storage rental = rentals[_rentalId];
        rental.status = _status;
        emit RentalStatusUpdated(_rentalId, _status);
    }

    function deleteRental(uint256 _rentalId, uint256 _userId) public {
        require(_rentalId < nextRentalId, "Invalid rental ID");

        delete rentals[_rentalId];
        delete rentalToUser[_rentalId];
    }
}
