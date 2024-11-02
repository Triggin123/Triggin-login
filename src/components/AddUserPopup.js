import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { Input2 } from "./form-components/Input";
import { saveUser, GetUser, updateUser } from "../actions/users";

const validationSchema = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  businessName: yup.string().required("Business name is required"),
})

const AddUserPopup = (props) => {
  const { width, selected } = props
  const dispatch = useDispatch()
  const save = useSelector(state => state?.user?.save);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
      businessName:""
    },
    validationSchema: validationSchema,
    onSubmit: (vals) => {
      let reqdata = {
        fname: vals?.fname,
        lname: vals?.lname,
        email: vals?.email,
        phoneNumber: vals?.phoneNumber,
        businessName: vals?.businessName
      }
      if(selected && selected?._id){
        reqdata._id=selected?._id;
        dispatch(updateUser(reqdata))
      }else{
        dispatch(saveUser(reqdata))
      }
    }
  })

  useEffect(() => {
    if (selected?._id) {
      formik.setValues({
        _id:selected?._id,
        fname: selected?.fname,
        lname: selected?.lname,
        phoneNumber:selected?.phoneNumber,
        email: selected?.email,
        businessName: selected?.businessName
      });
    }
  }, [selected]);


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
                disabled={props.selected?._id}
                label={"First name"}
                placeholder="Enter first name"
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="lname"
                label={"Last name"}
                disabled={props.selected?._id}
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
                placeholder="Enter email"
                disabled={props.selected?._id}
              />
            </div>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="phoneNumber"
                label={"Mobile"}
                placeholder="Enter mobile"
                disabled={props.selected?._id}
              />
            </div>
          </div>
          <div className='d-flex gap1'>
            <div className='w-50'>
              <Input2
                formik={formik}
                name="businessName"
                label={"Business Name"}
                placeholder="Enter business name"
              />
            </div>
          </div>
        </div>
        <div className="offcanvas-footer p-3">
          <button type="submit" className={`btn btn-primary w-100 ${save?.loading ? "loadBtn" : ""}`}>{props.selected?._id ? "Update" :"Save"}</button>
        </div>
      </form>
    </div>
  </div>
}

export default AddUserPopup;