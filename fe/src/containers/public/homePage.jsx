import React, { useEffect, useRef, useState } from "react";
import { path } from '../../ultils/constant';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { bgHome } from "../../assets/img";

const HomePage = () => {
  
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
