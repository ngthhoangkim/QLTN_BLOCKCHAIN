import { Link, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { motion } from "framer-motion";
import { path } from "../../ultils/constant";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { logo } from "../../assets/img";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, id } = useSelector((state) => state.auth);

  const goLogin = useCallback((flag) => {
    navigate(`/${path.LOGIN}`, { state: { flag } });
  }, [navigate]);

  const handleLogout = () => {
    dispatch(actions.logout());
    navigate("/");
  };


  return (
    <nav className="bg-gradient-to-b from-[#48c6ef] to-[#6f86d6] relative px-4 py-4 flex justify-between items-center">
      {/* logo */}
      <Link className="text-3xl font-bold leading-none ml-4" to={"/"}>
        <img src={logo} className="w-24 h-auto" />
      </Link>

      {/* menu */}
      <ul className="flex-grow flex justify-center space-x-20 ml-24">
        <li>
          <Link className="text-[#d9dcd6] text-2xl font-bold hover:text-[#2f6690]" to={"/"}>
            Trang chủ
          </Link>
        </li>
        <li>
          <Link className="text-[#d9dcd6] text-2xl font-bold  hover:text-[#2f6690]" to={"/"}>
            Thuê nhà
          </Link>
        </li>
        <li>
          <Link className="text-[#d9dcd6] text-2xl font-bold  hover:text-[#2f6690]" to={"/"}>
            Đăng tin cho thuê
          </Link>
        </li>

      </ul>

      <div className="flex space-x-6 items-center">
        {isLoggedIn ? (
          <>
            {/* Hiển thị icon user */}
            <div className="relative flex items-center space-x-2">
              <Link to={`/${path.PROFILE}`} className="text-[#d9dcd6] hover:text-[#2f6690]">
                <CiUser className="text-3xl" />
              </Link>
            </div>

            <button onClick={handleLogout} className="text-[#d9dcd6] hover:text-[#2f6690]">
              <IoIosLogOut className="text-3xl" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <motion.button
              className="relative overflow-hidden border-2 border-[#d9dcd6] text-[#d9dcd6] py-4 px-8 rounded-lg font-semibold text-sm transition-all duration-300 group"
              onClick={() => goLogin(false)}
            >
              <span className="relative z-10">Đăng nhập</span>
              <span className="absolute inset-0 bg-[#2f6690] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
            <motion.button
              className="relative overflow-hidden border-2 border-[#d9dcd6] text-[#d9dcd6] py-4 px-8 rounded-lg font-semibold text-sm transition-all duration-300 group"
              onClick={() => goLogin(true)}
            >
              <span className="relative z-10">Đăng ký</span>
              <span className="absolute inset-0 bg-[#2f6690] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
