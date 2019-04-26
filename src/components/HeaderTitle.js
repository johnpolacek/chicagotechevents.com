import React from 'react'
import { H1 } from 'styled-system-html'

const HeaderTitle = props => (
  <H1 mb={[5, 5, 5, 4]} fontWeight="normal" fontSize={[5, 5, 5, 6]}>
    {props.children}
  </H1>
)

export default HeaderTitle
