import React from 'react'
import { Button as Btn }  from 'styled-system-html'

const Button = props => (
  <Btn
    bg="cyan"
    color="white"
    px={3}
    py={2}
    borderRadius="4px"
    fontSize={0}
    {...props}
  />
)

export default Button
