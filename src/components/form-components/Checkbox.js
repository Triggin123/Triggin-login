import React from 'react';

const Checkbox = ({ field }) => {
    return (
      <label className="text-gray-500 font-bold">
        <input {...field} className="mr-2 leading-tight" type="checkbox" />
        <span className="text-sm">{field.label}</span>
      </label>
    );
  };


  export default Checkbox;