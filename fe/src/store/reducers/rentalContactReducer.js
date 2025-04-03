import actionTypes from "../actions/actionTypes";

const initialState = {
  rentalContracts: [],
};

const rentalContractReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RENTAL_CONTRACT:
      return {
        ...state,
        rentalContracts: [...state.rentalContracts, action.payload],
      };

    case actionTypes.GET_RENTAL_CONTRACT:
      return {
        ...state,
        rentalContracts: [
          ...state.rentalContracts.filter(
            (contract) => contract.rentalId !== action.payload.rentalId
          ),
          action.payload,
        ],
      };
    case actionTypes.DELETE_RENTAL_CONTRACT:
      return {
        ...state,
        rentalContracts: state.rentalContracts.filter(
          (contract) => contract.rentalId !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default rentalContractReducer;
