/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

export default function CurvedRectangle({ image, onClick }) {
  return (
    <div
      className="w-32 h-32 bg-gray-200 rounded-lg border border-black/10 flex justify-center items-center shadow-md cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
    </div>
  );
}
