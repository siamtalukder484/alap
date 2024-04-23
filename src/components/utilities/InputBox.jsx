import { TextField } from '@mui/material'
import React from 'react'

const InputBox = ({variant,placeholder, styleing}) => {
  return (
    <TextField fullWidth className={styleing} id="standard-basic" label={placeholder} variant={variant}  />
  )
}

export default InputBox