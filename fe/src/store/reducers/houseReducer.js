import actionTypes from "../actions/actionTypes";

const initialState = {
  houseTypes: [],
};

const houseTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HOUSE_TYPES:
      return { ...state, houseTypes: action.payload };
    
    case actionTypes.ADD_HOUSE_TYPE:
      return { ...state, houseTypes: [...state.houseTypes, action.payload] };
    
    case actionTypes.UPDATE_HOUSE_TYPE:
      return {
        ...state,
        houseTypes: state.houseTypes.map((houseType) =>
          houseType.id === action.payload.id
            ? { ...houseType, name: action.payload.newName }
            : houseType
        ),
      };
    
    case actionTypes.REMOVE_HOUSE_TYPE:
      return {
        ...state,
        houseTypes: state.houseTypes.filter((houseType) => houseType.id !== action.payload),
      };
    
    default:
      return state;
  }
};

export default houseTypeReducer;
