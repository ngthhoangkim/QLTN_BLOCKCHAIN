import React from "react";
import { Link } from "react-router-dom";
import { path } from '../../ultils/constant';
import { logo } from "../../assets/img";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 w-64 h-screen p-5">
      <Link to={`/`}>
        <img
          src={logo}
          alt="logo"
          className="w-20 h-auto ml-8 mb-8"
        />
      </Link>
      <ul className="space-y-10">
        <li>
          <Link
            to={`/`}
            className="text-gray-600 text-xl font-medium hover:text-blue-500"
          >
            🏠 Trang chủ
          </Link>
        </li>
        <li>
          <Link
            to={`/admin/${path.ADD_HOUSE_TYPE}`}
            className="text-gray-600 text-xl font-medium hover:text-blue-500"
          >
            🏠 Thêm loại nhà
          </Link>
        </li>
        <li>
          <Link
            to={`/admin/${path.BROWSE_POST}`}
            className="text-gray-600 text-xl font-medium hover:text-blue-500"
          >
            🏠 Duyệt bài đăng
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
