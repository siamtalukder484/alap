import React, { useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Images from '../../components/utilities/Images';
import InputBox from '../../components/utilities/InputBox';
import LoginImg from '../../assets/images/loginimg.webp'
import Paragraph from '../../components/utilities/Paragraph';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import registrationvalidation from '../../validation/RegistrationValidation';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,updateProfile   } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { Puff } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";


const LoginHeading = styled(Typography)({
  color: "#03014C",
  fontSize: "33px",
  marginBottom: "30px"
})
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 20,
  padding: '26px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#5F34F5',
  borderColor: '#0063cc',
  width: "100%",
  marginTop: "50px",
 marginBottom: "40px"
});

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    email: '',
    password: ''
  }
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registrationvalidation,
    onSubmit: (values,actions) => {
      // console.log(values);
      setLoading(true)
      actions.resetForm();
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: values.fullName,
            }).then(() => {
              // console.log(userCredential.user);
              set(ref(db, 'users/' + userCredential.user.uid), {
                displayName: userCredential.user.displayName,
                email: userCredential.user.email,
                profile_picture : userCredential.user.photoURL,
              }).then(()=>{
                console.log("real time data create hoice");
                toast("Registration Successfull..")
                setLoading(false)
                setTimeout(()=>{
                  navigate("/")
                },2000)
              });
            }).catch((error) => {
              setLoading(false)
              console.log("profile update er jamela");
            });
          });
         
        })
        .catch((error) => {
          console.log(error);
          setLoading(false)
          // const errorCode = error.code;
          // const errorMessage = error.message;
          
        });
      // alert(JSON.stringify(values, null, 2));
    },
  });
  

  return (
    <>
    {loading &&
      <div className='loading_wrapper'>
        <Puff
          visible={true}
          height="120"
          width="120"
          color="#fff"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
      />
      </div>
    }
    <Box sx={{ flexGrow: 1 }}>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />

      <Grid container spacing={0}>
        <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div>
            <LoginHeading variant="h4">
              Get started with easily register
            </LoginHeading>
            <Paragraph styleing="regsubheading" text="Free register and you can enjoy it" />
            <form onSubmit={formik.handleSubmit}>
              <div className='logininputbox'>
                <div>
                  <InputBox 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    variant="outlined" 
                    placeholder="Email Address" 
                    styleing="emailbox" 
                  />
                  {formik.touched.email && formik.errors.email ? (
                      <p style={{color:"red"}} >{formik.errors.email}</p>
                    ) : null}
                </div>
                <div>
                  <InputBox 
                    type="text" 
                    name="fullName" 
                    id="fullName" 
                    value={formik.values.fullName} 
                    onChange={formik.handleChange}
                    variant="outlined" 
                    placeholder="Full Name" 
                    styleing="emailbox" 
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                      <p style={{color:"red"}} >{formik.errors.fullName}</p>
                    ) : null}
                </div>
                <div>
                  <InputBox 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formik.values.password} 
                    onChange={formik.handleChange}
                    variant="outlined" 
                    placeholder="Password" 
                    styleing="passwordbox" 
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p style={{color:"red"}} >{formik.errors.password}</p>
                    ) : null}
                </div>
                {/* <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl> */}
              </div>
              <BootstrapButton type='submit' variant="contained" disableRipple>
                  Sign Up
              </BootstrapButton>
            </form>
            <span style={{color: "#03014C", fontSize: "14px", fontWeight: "700"}}>Already Have an Acount ? <Link to="/" style={{color: "#EA6C00",fontSize: "14px", fontWeight: "700"}}>Sing In</Link></span>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ width: "100%", height: "100vh" }}>
            <Images source={LoginImg} alt="monkey" styleing="loginbigimg" />
          </div>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Registration