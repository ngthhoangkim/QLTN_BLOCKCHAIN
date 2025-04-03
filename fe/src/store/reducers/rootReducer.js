import authReducer from "./authReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import houseTypeReducer from "./houseReducer";
import rentalReducer from "./postHouseReducer";
import logoutReducer from "./logoutReducer";
import userReducer from "./userReducer";
import rentalContractReducer from "./rentalContactReducer";


const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key : "auth",
    whitelist: ["isLoggedIn", "token", "role","id"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    houseType: houseTypeReducer,
    logout: logoutReducer,
    postHouse : rentalReducer,
    user: userReducer,
    contact: rentalContractReducer
});

export default rootReducer;