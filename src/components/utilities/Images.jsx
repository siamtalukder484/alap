import React from 'react'

const Images = ({source, alt, styleing, onClick}) => {
  return (
    <img src={source} alt={alt} className={styleing} onClick={onClick} />
  )
}

export default Images