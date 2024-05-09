import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Images from '../../components/utilities/Images';
import LoginwithGoogle from '../../assets/images/loginwithgoogle.webp'
import LoginImg from '../../assets/images/loginimg.webp'
import "./auth.css"
import InputBox from '../../components/utilities/InputBox';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import loginvalidation from '../../validation/LoginValidation';
import Modal from '@mui/material/Modal';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const auth = getAuth();

  const initialValues = {
    email: '',
    password: ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginvalidation,
    onSubmit: (values,actions) => {
      // console.log(values);
      actions.resetForm();
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              
              const user = userCredential.user;
              console.log(user);
            })
            .catch((error) => {
              // const errorCode = error.code;
              // const errorMessage = error.message;
                console.log(error);
            });
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div>
            <LoginHeading variant="h4">
              Login to your account!
            </LoginHeading>
            <Images source={LoginwithGoogle} alt="google" styleing="loginwithgoogle" />
            <form onSubmit={formik.handleSubmit}>
              <div className='logininputbox'>
                <div>
                  <InputBox 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    variant="standard" 
                    placeholder="Email Address" 
                    styleing="emailbox" />
                     {formik.touched.email && formik.errors.email ? (
                      <p style={{color:"red"}} >{formik.errors.email}</p>
                    ) : null}
                </div>
                <div>
                  <InputBox 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formik.values.password} 
                    onChange={formik.handleChange}
                    variant="standard" 
                    placeholder="Password" 
                    styleing="passwordbox" />
                      {formik.touched.password && formik.errors.password ? (
                      <p style={{color:"red"}} >{formik.errors.password}</p>
                    ) : null}
                </div>
              </div>
              <BootstrapButton type='submit' variant="contained" disableRipple>
                  Login to Continue
              </BootstrapButton>
            </form>
            <span style={{color: "#03014C", fontSize: "14px", fontWeight: "700"}}>Don’t have an account ? 
            <Link to="/registration" style={{color: "#EA6C00",fontSize: "14px", fontWeight: "700"}}>Sing Up</Link></span>
            <p onClick={handleOpen}>Forget Password?</p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ width: "100%", height: "100vh" }}>
            <Images source={LoginImg} alt="monkey" styleing="loginbigimg" />
          </div>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{textAlign: "center", marginBottom: "15px"}}>Forget your password</h1>
          <div>
              <InputBox 
                type="email" 
                name="forgetemail" 
                id="forgetemail" 
                variant="outlined" 
                placeholder="Forget Email Address" 
                styleing="emailbox" />
            </div>
            <BootstrapButton type='submit' variant="contained" disableRipple>
                  Reset Password
            </BootstrapButton>
            <button onClick={()=>setOpen(false)}>Close </button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Login