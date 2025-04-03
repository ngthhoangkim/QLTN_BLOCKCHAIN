import actionTypes from "./actionTypes";

export const addHouseType = (houseType) => ({
  type: actionTypes.ADD_HOUSE_TYPE,
  payload: houseType,
});

export const setHouseTypes = (houseTypes) => ({
  type: actionTypes.SET_HOUSE_TYPES,
  payload: houseTypes,
});

export const updateHouseType = (id, newName) => ({
  type: actionTypes.UPDATE_HOUSE_TYPE,
  payload: { id, newName },
});

export const removeHouseType = (id) => ({
  type: actionTypes.REMOVE_HOUSE_TYPE,
  payload: id,
});
