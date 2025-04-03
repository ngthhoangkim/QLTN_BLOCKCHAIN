import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import "./css/App.css";
import { Home, HomePage, Login, PostHouse, Profile } from "./containers/public";
import { Admin, BrowsePost, HouseType } from "./containers/admin";
import RentHouse from "./containers/public/rentHouse";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {/*các trang dành cho user */}
        <Route path={path.HOME} element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.POST_HOUSE} element={<PostHouse />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.RENT_HOUSE} element={<RentHouse />} />
        </Route>
        {/* các trang dành cho admin */}
        <Route path={path.ADMIN} element={<Admin />}>
          <Route path={path.ADD_HOUSE_TYPE} element={<HouseType />} />
          <Route path={path.BROWSE_POST} element={<BrowsePost />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
