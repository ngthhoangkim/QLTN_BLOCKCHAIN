import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { InputForm, Button } from "../../components";
import Swal from 'sweetalert2'
import { bgAuth } from "../../assets/img";


const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { isLoggedIn, msg, update, role } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag);
    const [invalidFields, setInvalidFields] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [payload, setPayload] = useState({
        email: '',
        name: '',
        phone: '',
        birthday: '',
        password: '',
        address: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setIsRegister(location.state?.flag);
    }, [location.state?.flag]);

    useEffect(() => {
        if (isLoggedIn) {
            if (role === 'user') {
                navigate('/');
            } else if (role === 'admin') {
                navigate('/admin');
            }
        }
    }, [isLoggedIn, role, navigate]);

    useEffect(() => {
        msg && Swal.fire('Thông báo!', msg, 'warning')
    }, [msg, update])

    //xử lý sumit
    const handleSumit = async () => {
      
        let finalPayload = isRegister
            ? payload
            : {
                phone: payload.phone,
                password: payload.password,
            };
        const formattedPayload = {
            ...payload,
            birthday: new Date(payload.birthday).toLocaleDateString("en-GB"),
        };

        let invalids = validate(finalPayload);
        if (invalids.length === 0) {
            if (isRegister) {
                // Gọi hành động đăng ký
                dispatch(actions.register(formattedPayload))
                    .then(() => {
                        // Hiển thị thông báo thành công
                        Swal.fire("Thành công!", "Đăng ký tài khoản thành công.", "success");

                        // Reset form
                        setPayload({
                            email: "",
                            name: "",
                            phone: "",
                            birthday: "",
                            password: "",
                            address: ""
                        });
                        setConfirmPassword("");
                    })
                    .catch((error) => {
                        Swal.fire("Lỗi!", error.message || "Đăng ký thất bại.", "error");
                    });
            } else {
                // Gọi hành động đăng nhập
                dispatch(actions.login(finalPayload));
            }
        }
    };

    //thông báo lỗi 
    const validate = (payload) => {
        let invalids = [];
        let fields = Object.entries(payload);

        fields.forEach(([key, value]) => {
            if (value.trim() === "") {
                invalids.push({
                    name: key,
                    message: "Bạn không được bỏ trống trường này.",
                });
            } else {
                switch (key) {
                    case "password":
                        if (value.length < 5) {
                            invalids.push({
                                name: key,
                                message: "Mật khẩu phải có tối thiểu 5 kí tự.",
                            });
                        }
                        break;
                    case "phone":
                        if (!/^\d{7,11}$/.test(value)) {
                            invalids.push({
                                name: key,
                                message: "Số điện thoại không hợp lệ!",
                            });
                        }
                        break;
                    case "email":
                        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                            invalids.push({
                                name: key,
                                message: "Email không hợp lệ.",
                            });
                        }
                        break;
                    case "birthday": {
                        const date = new Date(value);
                        if (isNaN(date.getTime())) {
                            invalids.push({
                                name: key,
                                message: "Bạn chưa điền ngày sinh!",
                            });
                        }
                        break;
                    }
                    case "name":
                        if (value.length > 20) {
                            invalids.push({
                                name: key,
                                message: "Tên đăng nhập không được vượt quá 20 kí tự.",
                            });
                        }
                        break;
                    case "address":
                        if (value.length > 50) {
                            invalids.push({
                                name: key,
                                message: "Địa chỉ quá dài",
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        });

        if (isRegister && payload.password !== confirmPassword) {
            invalids.push({
                name: "confirmPassword",
                message: "Mật khẩu không khớp.",
            });
        }

        setInvalidFields(invalids);
        return invalids;
    };

    return (
        <div
            className="mt-12 h-screen bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${bgAuth})`,
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            {/* Form Container */}
            <div className="flex flex-col items-center justify-center h-screen relative z-10">
                <div className="w-full max-w-md bg-gradient-to-r from-[#4facfe] to-[#330867] rounded-xl shadow-md py-6 px-6 z-20 max-h-screen">
                    <h2 className="text-[28px] font-bold text-[#d9dcd6] mb-4 text-center">
                        {isRegister ? "Đăng ký" : "Đăng nhập"}
                    </h2>
                    <form className="flex flex-col space-y-4 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
                        {isRegister && (
                            <InputForm
                                type="email"
                                value={payload.email}
                                onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                                placeholder="Email"
                                errorMessage={invalidFields.find((field) => field.name === "email")?.message}
                            />
                        )}
                        <div className="flex space-x-4">
                            {isRegister && (
                                <InputForm
                                    value={payload.name}
                                    onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                                    placeholder="Tên đăng nhập"
                                    errorMessage={invalidFields.find((field) => field.name === "name")?.message}
                                    className="flex-1"
                                />
                            )}
                            {isRegister && (
                                <InputForm
                                    type="date"
                                    value={payload.birthday}
                                    onChange={(e) => setPayload({ ...payload, birthday: e.target.value })}
                                    placeholder="Ngày sinh"
                                    errorMessage={invalidFields.find((field) => field.name === "birthday")?.message}
                                    className="flex-1"
                                />
                            )}
                        </div>
                        <InputForm
                            type="phone"
                            value={payload.phone}
                            onChange={(e) => setPayload({ ...payload, phone: e.target.value })}
                            placeholder="Số điện thoại"
                            errorMessage={invalidFields.find((field) => field.name === "phone")?.message}
                        />
                        {isRegister && (
                            <InputForm
                                value={payload.address}
                                onChange={(e) => setPayload({ ...payload, address: e.target.value })}
                                placeholder="Nhập địa chỉ"
                                errorMessage={invalidFields.find((field) => field.name === "address")?.message}
                                className="flex-1"
                            />
                        )}
                        <div className="flex space-x-4">
                            <InputForm
                                isPassword
                                value={payload.password}
                                onChange={(e) => setPayload({ ...payload, password: e.target.value })}
                                placeholder="Mật khẩu"
                                togglePasswordVisibility={togglePasswordVisibility}
                                showPassword={showPassword}
                                errorMessage={invalidFields.find((field) => field.name === "password")?.message}
                                className="flex-1"
                            />
                            {isRegister && (
                                <InputForm
                                    isPassword
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Xác nhận mật khẩu"
                                    togglePasswordVisibility={togglePasswordVisibility}
                                    showPassword={showPassword}
                                    errorMessage={invalidFields.find((field) => field.name === "confirmPassword")?.message}
                                    className="flex-1"
                                />
                            )}
                        </div>
                        <Button
                            text={isRegister ? "Đăng ký" : "Đăng nhập"}
                            borderColor="border-[#d9dcd6]"
                            textColor="text-white"
                            onClick={handleSumit}
                        />
                        <p className="text-[#d9dcd6] mt-2 text-center">
                            {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
                            <span
                                className="text-primary font-bold hover:underline ml-1"
                                onClick={() => setIsRegister(!isRegister)}
                            >
                                {isRegister ? "Đăng nhập" : "Đăng ký"}
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
