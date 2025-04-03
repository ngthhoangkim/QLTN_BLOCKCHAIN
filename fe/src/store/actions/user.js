import { apiGetOneUser } from "../../services/user";
import actionTypes from "./actionTypes";

//get one
export const getOneUser = (id) => async (dispatch) => {
    try {
      const response = await apiGetOneUser(id);
      if (response?.data.err === 0) {
        dispatch({
          type: actionTypes.GET_ONE_USER,
          user: response.data.data, 
          msg: response.data.msg, 
        });
      } else {
        dispatch({
          type: actionTypes.GET_ONE_USER,
          user: null,
          msg: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ONE_USER,
        customer: null,
        msg: "Có lỗi xảy ra khi lấy thông tin!",
      });
    }
  };
  