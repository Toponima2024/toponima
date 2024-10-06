import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <img
        src="/img/logo.png"
        alt="Loading..."
        className="animate-spin h-8 w-32"
      />
    </div>
  );
};

export default LoadingSpinner;