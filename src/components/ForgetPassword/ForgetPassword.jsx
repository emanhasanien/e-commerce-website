import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

export default function ForgetPassword() {
  let [passwordSmitted, setpasswordSmitted] = useState();
  let [resetPassword, setresetPassword] = useState();
  let [resetCode, setResetCode] = useState();
  let [isLoading, setIsLoading] = useState(false)
  let {isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext)
  let navigate =useNavigate()
  let res;
  let response

  async function forgetPassword(values) {
    setpasswordSmitted(false);
    res = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      setpasswordSmitted(true);
    }
    console.log(res);
  }

  async function verifyResetCode(values) {
    setresetPassword(false);
    setIsLoading(true)
     response = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode: values.code,
      })

      .catch((err) => {
        setResetCode(false);
        console.log(err);
      });

      setIsLoading(false)

    if (response ) {
      setresetPassword(true);
      setResetCode(true);
     
    }

 
  }




  async function resetUserPassword(values) {
    console.log(values);
    let response = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: values.email,
        newPassword: values.newPassword,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(response);
    updateLoggeduserpassword(values )
  }



  async function updateLoggeduserpassword(values ){
     
    let data = axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',{
        "currentPassword":values.password,
        "password":values.rePassword,
        "rePassword":values.rePassword
    },
    {
        headers:{
            token:response?.data.token
        }
    }).catch((err) =>{
        console.log(err)
    })
    console.log(data)
    if(data){
      setIsUserLoggedIn(true)
      navigate('/home')
    }

}

  let formik1 = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPassword,
  });

  let formik2 = useFormik({
    initialValues: {
      code: "",
    },
    onSubmit: verifyResetCode,
  });

  let formik3 = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetUserPassword,
  });

  return (
    <>
      <div className="container">
        {!passwordSmitted ? (
          <>
            <h1 className="fw-bolder">please enter your verification code</h1>
            <form onSubmit={formik1.handleSubmit}>
              <input
                className="form-control p-3 my-3"
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik1.handleChange}
                onBlur={formik1.handleBlur}
                value={formik1.values.email}
              />

             
              <button className="btn btn-success px-3">Verify</button>
            </form>
          </>
        ) : (
          <>
            <h1 className="fw-bolder">Reset code sent to your email</h1>
            <form onSubmit={formik2.handleSubmit}>
              <input
                className="form-control p-3 my-3"
                type="text"
                placeholder="code"
                name="code"
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                value={formik2.values.code}
              />
              
              {isLoading?  <button className="btn btn-success px-3"><i className="fas fa-spinner fa-spin fx-2"></i></button> :  <button className="btn btn-success px-3">Verify</button>}
             
            </form>

            {formik2.values.code !== "" ? (
              <>
                {!resetCode && resetCode === false ? (
                  <div className="alert alert-danger  text-danger text-center mt-3">
                    Invalide code
                  </div>
                ) : (
                  <>
                  
                    <form onSubmit={formik3.handleSubmit}>
                      <input
                        className="form-control p-3 my-3"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={formik3.handleChange}
                        onBlur={formik3.handleBlur}
                        value={formik3.values.email}
                      />

                     
                          <input
                        onBlur={formik3.handleBlur}
                        onChange={formik3.handleChange}
                        value={formik3.values.newPassword}
                        className="form-control mb-3"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="newPassword"
                      />
                      <button  className="btn btn-success px-3 my-3">
                        reset password
                      </button>
                    </form>
                  </>
                )}
              </>
            ) : null}
          </>
        )}
      </div>
    </>
  );
}
