import { CiSearch } from "react-icons/ci";
import React from "react";

const Search = ({ placeholder, value, onChange }) => {
    return (
        <div className="relative w-dvh">
            <input
                type="text"
                placeholder={placeholder}
                value={value} 
                onChange={onChange} 
                className="w-full px-4 py-2 pl-10 border border-[#2f6690] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2f6690]"
            />
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-txtCard text-xl" />
        </div>
    );
};

export default Search;
