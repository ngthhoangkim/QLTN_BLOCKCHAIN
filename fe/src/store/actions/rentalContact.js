import { deleteRentalContractService, getRentalContractService, registerTenantService } from "../../services/rentalContact";
import actionTypes from "./actionTypes";

export const registerTenant = (rentalId, tenantData) => async (dispatch) => {
  try {
    const response = await registerTenantService(rentalId, tenantData);
    if (response.success) {
      dispatch({
        type: actionTypes.ADD_RENTAL_CONTRACT,
        payload: { rentalId, ...tenantData },
      });
    } else {
      console.error(response.message);
    }
  } catch (error) {
    console.error("Lỗi khi đăng ký hợp đồng thuê:", error);
  }
};

export const getRentalContract = (rentalId) => async (dispatch) => {
  try {
      const contractData = await getRentalContractService(rentalId);
    
      dispatch({
          type: actionTypes.GET_RENTAL_CONTRACT,
          payload: contractData, 
      });
  } catch (error) {
      console.error("❌ Lỗi khi lấy hợp đồng thuê:", error);
  }
};

export const deleteRentalContract = (rentalId) => async (dispatch) => {
  try {
    const response = await deleteRentalContractService(rentalId);
    if (response.success) {
      dispatch({
        type: actionTypes.DELETE_RENTAL_CONTRACT,
        payload: rentalId,
      });
    } else {
      console.error("Lỗi khi xóa hợp đồng thuê:", response.message);
    }
  } catch (error) {
    console.error("Lỗi khi xóa hợp đồng thuê:", error);
  }
};


