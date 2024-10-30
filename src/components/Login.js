import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, Login as LoginType } from '../actions/auth';
import Input from './form-components/Input';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const login_res = useSelector((state) => state?.auth?.login)
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    onSubmit: (vals) => {
      dispatch(login(vals))
    }
  })

  useEffect(() => {
    if (login_res?.suc) {
      console.log(login_res);
      localStorage.setItem('token', login_res?.token);
      let user = {
         name: login_res?.data?.name,
         email: login_res?.data?.email,
         phoneNumber: login_res?.data?.phoneNumber,
         isSuperAdmin: login_res?.data?.isSuperAdmin,
         role: login_res?.data?.role,
      }
      localStorage.setItem('user', JSON.stringify(user));
      toast.success("Login Successful.")
      navigate("/home")
      dispatch({
        type: LoginType.RESET
      })
    }

    if (login_res?.suc === false) {
      toast.error(login_res?.msg)
      dispatch({
        type: LoginType.RESET
      })
    }
    // eslint-disable-next-line
  }, [login_res])
  return (
    <div className='simple-page'>
      <div className="simple-page-wrap">
        <div className="simple-page-form animated flipInY" id="login-form">
          <div className="simple-page-logo animated swing">
            <span>Triggin</span>
          </div>
          <h4 className="form-title m-b-xl text-center">Sign In With Your Account</h4>
          <form onSubmit={formik.handleSubmit}>
            <Input formik={formik} name={"phoneNumber"} placeholder="Username" type={"text"} />
            <Input formik={formik} name={"password"} placeholder="Password" type={"password"} />
            <button type="submit" name="Submit" value="Login" className={`btn btn-primary ${login_res?.loading ? "loadBtn" : ""}`}>Login</button>
          </form>
        </div >

        <div className="simple-page-footer">
          <p><span className='link'>Forgot Your Password ?</span></p>
          <p>
            <small>Don't have an account ?</small>
            <span className='link'>CREATE AN ACCOUNT</span>
          </p>
        </div>
      </div >
    </div >
  );
};

export default Login;