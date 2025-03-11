import React, { memo } from 'react'

const Button = ({ text, textColor, borderColor, onClick }) => {
    return (
        <button
            type='button'
            className={`w-fit py-2 px-2 text-lg ${textColor} ${borderColor} border outline-none rounded-md hover:opacity-80 active:opacity-60 transition-all duration-150 flex items-center justify-center gap-1 mx-auto`}
            onClick={onClick}
        >
            <span> {text}</span>
        </button>
    )
}

export default memo(Button);