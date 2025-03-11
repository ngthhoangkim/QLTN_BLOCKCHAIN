import React from "react";
import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import "./css/App.css";
import { Home, HomePage, Login } from "./containers/public";
import { Admin } from "./containers/admin";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        {/*các trang dành cho user */}
        <Route path={path.HOME} element={<Home />}>
          <Route index element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
        {/* các trang dành cho admin */}
        <Route path={path.ADMIN} element={<Admin />}>
        </Route>
      </Routes>
    </div>
  );
}
export default App;
