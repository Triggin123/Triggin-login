import React from 'react';
import moment from 'moment';

export const Input2 = ({ formik, placeholder, name, type, label, disabled }) => {
  return (
    <div className="mb-2">
      <label for="" class="form-label">{label}</label>
      <input type={type} className="form-control" placeholder={placeholder} value={formik.values[name]} name={name} disabled={disabled} onChange={(e) => {
        if (type === "date") {
          formik.setFieldValue(name, moment(e.target.value)?.format("YYYY-MM-DD"))
          return;
        }
        formik.setFieldValue(name, e.target.value?.trimStart())
      }} />
      <p className='errorMsg'>{formik.touched[name] && formik.errors[name]}</p>
    </div>
  );
};

export const Amount = ({ formik, placeholder, name, type, label }) => {
  return (
    <div className="mb-2">
      <label for="" class="form-label">{label}</label>
      <input type={type} className="form-control" placeholder={placeholder} value={formik.values[name]} name={name} onChange={(e) => {
        if (Number.isNaN(Number(e.target.value))) {
          return
        }
        formik.setFieldValue(name, e.target.value)
      }} />
      <p className='errorMsg'>{formik.touched[name] && formik.errors[name]}</p>
    </div>
  );
};

const Input = ({ formik, placeholder, name, type }) => {
  return (
    <div className="form-group">
      <input type={type} className="form-control" placeholder={placeholder} value={formik.values[name]} name={name} onChange={formik.handleChange} />
      <p className='errorMsg'>{formik.touched[name] && formik.errors[name]}</p>
    </div>
  );
};

export default Input;