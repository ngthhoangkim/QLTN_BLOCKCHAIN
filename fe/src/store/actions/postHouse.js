import {
  deleteRentalService,
  getAllRentalsService,
  updateRentalStatusService,
} from "../../services/postHouse";
import actionTypes from "./actionTypes";

export const addRental = (rental) => ({
  type: actionTypes.ADD_RENTAL,
  payload: rental,
});


export const getAllRentals = () => async (dispatch) => {
  try {
    const rentals = await getAllRentalsService();
    dispatch({
      type: actionTypes.SET_RENTALS,
      payload: rentals,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài đăng:", error);
  }
};

export const updateRentalStatus =
  (rentalId, status, userId, role, forceAvailable = false) => async (dispatch) => {
    try {
      const statusMap = {
        0: "Pending",
        1: "Available",
        2: "Rented",
      };

      let currentStatus = statusMap[Number(status)] || status;
      let newStatus = currentStatus;

      // ✅ Nếu forceAvailable = true, đặt trạng thái lại thành "Available"
      if (forceAvailable) {
        newStatus = "Available";
      } else if (role === "admin" && currentStatus === "Pending") {
        newStatus = "Available";
      } else if (role === "user" && currentStatus === "Available") {
        newStatus = "Rented";
      } else {
        console.error(
          "🚨 Hành động không hợp lệ. Status:",
          currentStatus,
          " | Role:",
          role
        );
        return;
      }

      const response = await updateRentalStatusService(
        rentalId,
        newStatus,
        userId
      );

      if (response.success) {
        dispatch({
          type: actionTypes.UPDATE_RENTAL_STATUS,
          payload: { rentalId, status: newStatus },
        });
      } else {
        console.error("Cập nhật thất bại:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái bài đăng:", error);
    }
  };


export const deleteRental = (rentalId, userId) => async (dispatch) => {
  try {
    const response = await deleteRentalService(rentalId, userId);
    if (response.success) {
      dispatch({
        type: actionTypes.REMOVE_RENTAL,
        payload: rentalId,
      });
    } else {
      console.error("Xóa thất bại:", response.message);
    }
  } catch (error) {
    console.error("Lỗi khi xóa bài đăng:", error);
  }
};
