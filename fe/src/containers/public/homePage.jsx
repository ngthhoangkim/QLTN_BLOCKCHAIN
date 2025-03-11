import React, { useEffect, useRef, useState } from "react";
import { path } from '../../ultils/constant';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { bgHome } from "../../assets/img";

const HomePage = () => {
  const { isLoggedIn, id } = useSelector((state) => state.auth);


  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className='w-full overflow-hidden'>
      {/* home background */}
      <div
        className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 relative"
        style={{
          backgroundImage: `url(${bgHome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="w-full space-y-5 z-20 relative flex flex-col items-center">
          <h1 className="text-[#ffb703] font-semibold text-5xl text-center" style={{ lineHeight: "1.5", letterSpacing: "0.05em" }}>
            Thuê nhà dễ dàng – Quản lý thông minh!
          </h1>
          <motion.button
            className="relative overflow-hidden border-2 border-[#ffb703] text-[#ffb703] py-3 px-10 rounded-lg font-semibold text-lg transition-all duration-300 group"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Hãy khám phá ngay
            </span>
            <span className="absolute inset-0 bg-[#ffb703] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
