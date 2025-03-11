import actionTypes from "./actionTypes";
import { apiRegister, apiLogin } from "../../services/auth";

//register
export const register = (payload) => async (dispatch) => {
  try {
    const response = await apiRegister(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: "Có lỗi xảy ra khi đăng ký",
    });
  }
};
//login
export const login = (payload) => async (dispatch) => {
  try {
    const response = await apiLogin(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: {
          token: response.data.token,
          role: response.data.role,
          id : response.data.id,
        },
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIL,
      data: "Có lỗi xảy ra khi đăng nhập.",
    });
  }
};
//logout
export const logout = () => ({
  type: actionTypes.LOGOUT,
});
