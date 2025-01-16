import React from 'react';

const Input = ({ children, value, onChange, placeholder, required, type }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none hover:border-blue-400 focus:ring-2 focus:ring-blue-500'
            placeholder={placeholder}
            required={required}
            type={type ? type : "text"}
        >
            {children}
        </input>
    );
}

export default Input;
