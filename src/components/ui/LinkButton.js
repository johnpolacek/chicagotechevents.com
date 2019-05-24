import React from 'react'
import { Span } from 'styled-system-html'

const LinkButton = props => (
  <Span
    bg="cyan"
    color="white"
    px={3}
    py={2}
    borderRadius="4px"
    fontSize={0}
    {...props}
  />
)

export default LinkButton
