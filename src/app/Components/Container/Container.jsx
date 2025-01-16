import React from 'react';

const Container = ({ children }) => {
    return (
        <div className='max-w-screen-lg w-full h-full mx-auto'>
            {children}
        </div>
    );
}

export default Container;
