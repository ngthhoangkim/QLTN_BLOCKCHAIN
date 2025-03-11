import React from "react";

export const InputForm = ({
    type = "text",
    value,
    onChange,
    placeholder,
    id,
    errorMessage = "",
    className = "",
    isPassword = false,
    togglePasswordVisibility,
    showPassword = false,
}) => {
    return (
        <div className={`relative ${className}`}>
            <input
                id={id}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-white text-black border border-gray-300 rounded-md p-2 w-full"
            />
            {isPassword && (
                <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={togglePasswordVisibility}
                >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
            )}
            {errorMessage && <p className="text-primary italic text-sm mt-1">{errorMessage}</p>}
        </div>
    );
};

export default InputForm