import React from 'react';
import SelectMulti from 'react-select'

const MuiltiSelect = ({ name, label, options = [], formik, disabled, isMulti }) => {
  return (
    <div className="mb-3">
      <label for="" className="form-label">{label}</label>
      <SelectMulti
        value={formik?.values?.[name]} name={name} aria-label={label} disabled={disabled} isMulti={isMulti}
        className="basic-multi-select"
        classNamePrefix="select"
        options={options}
        onChange={(e) => {
          formik.setFieldValue(name, e)
        }}
      />
      <p className='errorMsg'>{formik.touched[name] && formik.errors[name]}</p>
    </div>
  );
};

export default MuiltiSelect;