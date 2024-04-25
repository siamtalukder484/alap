import React from 'react'

const Paragraph = ({styleing, text}) => {
  return (
    <p className={styleing}>{text}</p>
  )
}

export default Paragraph