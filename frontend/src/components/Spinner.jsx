import React from 'react';

const Spinner = ({ size = 'md' }) => {
    const sizes = { sm: 'h-5 w-5', md: 'h-10 w-10', lg: 'h-16 w-16' };
    return (
        <div className="flex justify-center items-center py-12">
            <div className={`${sizes[size]} animate-spin rounded-full border-4 border-dark-600 border-t-brand-red`} />
        </div>
    );
};

export default Spinner;
