import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Images from '../../components/utilities/Images';
import InputBox from '../../components/utilities/InputBox';
import LoginImg from '../../assets/images/loginimg.webp'
import Paragraph from '../../components/utilities/Paragraph';

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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <div>
            <LoginHeading variant="h4">
              Get started with easily register
            </LoginHeading>
            <Paragraph styleing="regsubheading" text="Free register and you can enjoy it" />
            <div className='logininputbox'>
              <InputBox variant="outlined" placeholder="Email Address" styleing="emailbox" />
              <InputBox variant="outlined" placeholder="Full Name" styleing="emailbox" />
              <InputBox variant="outlined" placeholder="Password" styleing="passwordbox" />
              
            </div>
            <BootstrapButton variant="contained" disableRipple>
                Sign Up
            </BootstrapButton>
            <span style={{color: "#03014C", fontSize: "14px", fontWeight: "700"}}>Already Have an Acount ? <a href='/' style={{color: "#EA6C00",fontSize: "14px", fontWeight: "700"}}>Sing In</a></span>
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

export default Registration