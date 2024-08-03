import React, { useState } from "react";

const Category = ({ handleChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    'Education',
    'Healthcare',
    'Marketing',
    'IT',
    'Restaurant'
  ];

  const handleTagClick = (category) => {
    setSelectedCategory(prev => {
      const newSelection = prev === category ? null : category;
      
      handleChange(newSelection); // Notify parent component of the change
      return newSelection;
    });
  };

  return (
    <div className="p-6 bg-slate-100">
      <h4 className="text-lg font-medium mb-6 text-blue">Select Category</h4>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleTagClick(category)}
            className={`flex-1 min-w-[100px] px-3 py-3 rounded-2xl transition-colors duration-300 text-sm ${
              selectedCategory === category
                ? 'bg-blue text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex justify-center mb-6">
        <img
          src="./images/vecteezy-businessman-with-a-la-unscreen.gif"
          alt="Animated GIF"
          autoPlay
          muted
          loop
          className='h-[180px]'
        />
      </div>
      <div className="text-blue text-center font-semibold mt-8">
        jobnestlanka@gmail.com
      </div>
    </div>
  );
};

export default Category;
