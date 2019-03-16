import React from 'react'
import { Div } from 'styled-system-html'
import theme from '../theme'

export default (props) => (
  <Div bg="lite" fontFamily={theme.font}>
    <Div width={[1,1,640]} mx="auto" p={[0,3,4]} minHeight="100vh">
      {props.children}
    </Div>
  </Div>
)
