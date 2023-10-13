import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {

let navigate = useNavigate();

const[isLoading,setIsLoading]=useState(false);
const[apiError,setApiError]=useState("");

   function register(values){
    setIsLoading(true)
    axios.post(`https://sara7aiti.onrender.com/api/v1/user`,values).then((data)=>{
       console.log(data)
       if(data.data.message =="Added"){
      setIsLoading(false)
      navigate("/login")
    }
    }).catch((err)=>{
      console.log(err.response.data.error)
      setApiError(err.response.data.error)
      setIsLoading(false)
    })
   

    
  }

  const validationSchema = Yup.object({
    name: Yup.string().max(15, "Name Must be Less Than 15 Charcter").required("Name IS Required"),
    email: Yup.string().email("Invalid Email").required("Email IS Required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password Should Start With Captal").required("Password IS Required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")]).required("rePassword IS Required"),
    age: Yup.number().min(10, "Min Charcter Must Be 10").max(50, "Min Charcter Must Be 50").required("Age IS Required")
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    register(values)
    }
  });
  return (
    <div className='w-50 max-auto my-5'>
      <h3 className='text-center'>Register</h3>
      {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="userName">userName</label>
          <input type="text" id='userName' className='form-control' onBlur={formik.handleBlur} name='name' value={formik.values.name} onChange={formik.handleChange} />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>
            {formik.errors.name}
          </div> : ""}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="userEmail">userEmail</label>
          <input type="text" id='userEmail' className='form-control' onBlur={formik.handleBlur} name='email' value={formik.values.email} onChange={formik.handleChange} />
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
            {formik.errors.email}
          </div> : ""}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input type="password" id='password' className='form-control' onBlur={formik.handleBlur} name='password' value={formik.values.password} onChange={formik.handleChange} />
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>
            {formik.errors.password}
          </div> : ""}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="rePassword">rePassword</label>
          <input type="password" id='rePassword' className='form-control' onBlur={formik.handleBlur} name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>
            {formik.errors.rePassword}
          </div> : ""}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input type="number" id='age' className='form-control' name='age' onBlur={formik.handleBlur} value={formik.values.age} onChange={formik.handleChange} />
          {formik.errors.age && formik.touched.age ? <div className='alert alert-danger'>
            {formik.errors.age}
          </div> : ""}
        </div>

    <button type="submit" className="btn btn-default-outline d-block my-4 mx-auto rounded">
        {isLoading ? <i className="fa fa-spin fa-spinner"></i> : <><i className="fa fa-edit"></i>Register </>} 
      
      </button>


      </form>
    </div>
  )
}
