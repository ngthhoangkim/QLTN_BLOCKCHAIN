import actionTypes from "../actions/actionTypes";

const initialState = {
  rentals: [],
};

const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RENTAL:
      return {
        ...state,
        rentals: [...state.rentals, action.payload],
      };

    case actionTypes.SET_RENTALS:
      return {
        ...state,
        rentals: action.payload,
      };

    case actionTypes.UPDATE_RENTAL_STATUS:
      return {
        ...state,
        rentals: state.rentals.map((rental) =>
          rental.id === action.payload.rentalId
            ? { ...rental, status: action.payload.status }
            : rental
        ),
      };

    case actionTypes.REMOVE_RENTAL:
      return {
        ...state,
        rentals: state.rentals.filter((rental) => rental.id !== action.payload),
      };
      
    case actionTypes.GET_ALL_RENTALS:
      return {
        ...state,
        rentals: action.payload,
      };

    default:
      return state;
  }
};

export default rentalReducer;
