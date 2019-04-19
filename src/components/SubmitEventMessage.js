import React from 'react'
import { Div } from 'styled-system-html'

export default props => (
  <Div width={1} minHeight="60vh" display="flex" alignItems="center" justifyContent="center" fontSize={3} textAlign="center">
    <p>{props.children}</p>
  </Div>
)
