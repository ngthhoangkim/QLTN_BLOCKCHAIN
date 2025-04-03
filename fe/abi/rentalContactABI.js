const rentalContactABI = [
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
        internalType: "string",
        name: "cccd",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "phoneNumber",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tenantAddress",
        type: "address",
      },
    ],
    name: "RentalContractCreated",
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
    ],
    name: "RentalContractDeleted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "isRentalContracted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rentalContracts",
    outputs: [
      {
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "cccd",
        type: "string",
      },
      {
        internalType: "string",
        name: "phoneNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "address",
        name: "tenantAddress",
        type: "address",
      },
    ],
    stateMutability: "view",
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
        internalType: "string",
        name: "_cccd",
        type: "string",
      },
      {
        internalType: "string",
        name: "_phoneNumber",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "registerTenant",
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
    name: "getRentalContract",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "rentalId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "cccd",
            type: "string",
          },
          {
            internalType: "string",
            name: "phoneNumber",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "tenantAddress",
            type: "address",
          },
        ],
        internalType: "struct RentalContract.Tenant",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
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
    name: "deleteRentalContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default rentalContactABI;
