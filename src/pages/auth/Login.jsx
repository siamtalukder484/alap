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



const Login = () => {
  return (
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div>
            <LoginHeading variant="h4">
              Login to your account!
            </LoginHeading>
            <Images source={LoginwithGoogle} alt="google" styleing="loginwithgoogle" />
            <div className='logininputbox'>
              <InputBox variant="standard" placeholder="Email Address" styleing="emailbox" />
              <InputBox variant="standard" placeholder="Password" styleing="passwordbox" />
              
            </div>
            <BootstrapButton variant="contained" disableRipple>
                Login to Continue
            </BootstrapButton>
            <span style={{color: "#03014C", fontSize: "14px", fontWeight: "700"}}>Don’t have an account ? <a href='/registration' style={{color: "#EA6C00",fontSize: "14px", fontWeight: "700"}}>Sing UP</a></span>
          </div>
          

          
        </Grid>
        <Grid item xs={6}>
          <div style={{ width: "100%", height: "100vh" }}>
            <Images source={LoginImg} alt="monkey" styleing="loginbigimg" />
          </div>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login