import React from "react";

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full size-12 shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      aria-label="Add FAQ"
    >
      <span className="text-2xl">+</span>
    </button>
  );
};

export default FloatingActionButton;
