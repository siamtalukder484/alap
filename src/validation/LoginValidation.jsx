import React from 'react'
import * as Yup from 'yup';

const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const loginvalidation = Yup.object({
    email: Yup.string()
          .email('format thik koro')
          .matches(emailregex, 'regex check korlam')
          .required('please enter your email'),
    password: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .min(5, 'min 5 char ditea hobea')
              .required('please enter your password'),
  })


export default loginvalidation