import actionTypes from "../actions/actionTypes"

const initState = {
    user : null,
}

const userReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_ONE_USER:
      return {
        ...state,
        user: action.user || null,
        msg: action.msg || "",
      };
        default:
            return state
    }
}

export default userReducer