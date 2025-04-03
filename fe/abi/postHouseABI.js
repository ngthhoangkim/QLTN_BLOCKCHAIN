const postHouseABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "userId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "houseType",
        type: "string",
      },
    ],
    name: "RentalListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum RentalListing.RentalStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "RentalStatusUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "nextRentalId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rentalToUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rentals",
    outputs: [
      {
        internalType: "uint256",
        name: "userId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "houseType",
        type: "string",
      },
      {
        internalType: "string",
        name: "addressLocation",
        type: "string",
      },
      {
        internalType: "string",
        name: "contactNumber",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "bedrooms",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "bathrooms",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "width",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "enum RentalListing.RentalStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "userId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "houseType",
            type: "string",
          },
          {
            internalType: "string",
            name: "addressLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "contactNumber",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "bedrooms",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "bathrooms",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "width",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "length",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "imageUrls",
            type: "string[]",
          },
        ],
        internalType: "struct RentalListing.RentalInput",
        name: "input",
        type: "tuple",
      },
    ],
    name: "listRental",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rentalId",
        type: "uint256",
      },
    ],
    name: "getRental",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "userId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "houseType",
            type: "string",
          },
          {
            internalType: "string",
            name: "addressLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "contactNumber",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "bedrooms",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "bathrooms",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "width",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "length",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "imageUrls",
            type: "string[]",
          },
          {
            internalType: "enum RentalListing.RentalStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct RentalListing.Rental",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getAllRentals",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "userId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "houseType",
            type: "string",
          },
          {
            internalType: "string",
            name: "addressLocation",
            type: "string",
          },
          {
            internalType: "string",
            name: "contactNumber",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "bedrooms",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "bathrooms",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "width",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "length",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "imageUrls",
            type: "string[]",
          },
          {
            internalType: "enum RentalListing.RentalStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct RentalListing.Rental[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rentalId",
        type: "uint256",
      },
      {
        internalType: "enum RentalListing.RentalStatus",
        name: "_status",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_userId",
        type: "uint256",
      },
    ],
    name: "updateRentalStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rentalId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_userId",
        type: "uint256",
      },
    ],
    name: "deleteRental",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default postHouseABI;
