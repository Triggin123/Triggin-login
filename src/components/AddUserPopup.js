import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { Input2 } from "./form-components/Input";
import { getUser, saveUser, GetUser } from "../actions/users";

const validationSchema = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup.number()
          .typeError("Please enter number value only"),
})
const AddUserPopup = (props) => {
  const { width } = props
  const dispatch = useDispatch()
  const save = useSelector(state => state?.group?.save);

  const selectedUserDetails = useSelector(usr => usr?.user?.detail?.data);


  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (vals) => {
      let reqdata = {
        name: vals?.lname ? vals.fname+" "+vals.lname : vals?.fname,
        email: vals?.email,
        phoneNumber: vals?.phoneNumber
      }
      dispatch(saveUser(reqdata))
    }
  })

  useEffect(() => {
    if (props.selected?._id) {
      dispatch(getUser({phoneNumber:props.selected?.phoneNumber}));
    }
  }, [props.selected]);

  useEffect(() => {
    if (selectedUserDetails?._id) {
      formik.setValues({
        name: selectedUserDetails?.fname ,
        phoneNumber:selectedUserDetails?.phoneNumber,
        email: selectedUserDetails?.email,
      });
    }
  }, [selectedUserDetails]);


  return <div>
    <div className="offcanvas offcanvas-end show" style={{ width }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">{props.selected?._id ? "Update User" : "Add User"}</h5>
          <button type="button" className="btn-close text-reset" onClick={() => {
            dispatch({
              type:GetUser.RESET,
            })
            props.clearSelected();
            props.setOpen(o => !o);
          }}></button>
        </div>
        <div className="offcanvas-body">
          <div className='d-flex gap1'>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="fname"
                label={"First name"}
                placeholder="Enter first name"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="lname"
                label={"Last name"}
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className='d-flex gap1'>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="email"
                label={"Email"}
                disabled={selectedUserDetails?._id}
                placeholder="Enter email"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="phoneNumber"
                label={"Mobile"}
                disabled={selectedUserDetails?._id}
                placeholder="Enter mobile"
              />
            </div>
          </div>
        </div>
        <div className="offcanvas-footer p-3">
          <button type="submit" className={`btn btn-primary w-100 ${save?.loading ? "loadBtn" : ""}`}>Save & Submit</button>
        </div>
      </form>
    </div>
  </div>
}

export default AddUserPopup;