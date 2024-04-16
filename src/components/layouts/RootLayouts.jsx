import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const RootLayouts = () => {
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container >
                <Grid item xs={2}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={10}>
                    <Outlet/>
                </Grid>
            </Grid>
        </Box>
    </>
  )
}

export default RootLayouts