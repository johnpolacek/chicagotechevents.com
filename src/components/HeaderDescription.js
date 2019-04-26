import React from 'react'
import { H2 } from 'styled-system-html'

const HeaderDescription = props => (
  <H2 fontSize={[1, 2]} fontWeight="normal" pt={3} mt={[0, 2, 0]} px={4} pb={4}>
    {props.children}
  </H2>
)

export default HeaderDescription
