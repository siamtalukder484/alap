import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))
const LoginHeading = styled(Typography)({
   backgroundColor: 'red',
   color: "white",
   fontSize: "50px",
   '&:hover': {
    backgroundColor: '#0069d9',
  },
})
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 26,
  padding: '6px 30px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'red',
  borderColor: '#0063cc',
 
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Login = () => {
  return (
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <BootstrapButton variant="contained" disableRipple>
              Bootstrap
          </BootstrapButton>
          <LoginHeading variant="h4">
            Login to your account!
          </LoginHeading>
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
        </Grid>
        <Grid item xs={6}>
          <div style={{ backgroundColor:"red", width: "100%", height: "100vh" }}></div>
        </Grid>
        
      </Grid>
    </Box>
  )
}

export default Login