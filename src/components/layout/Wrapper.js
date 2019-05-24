import React from 'react'
import { Div } from 'styled-system-html'

const Wrapper = props => (
  <Div
    position="relative"
    width={1}
    mx="auto"
    px={[0, 3]}
    pb={3}
    style={{ maxWidth: '800px', zIndex: '999' }}
    {...props}
  />
)

export default Wrapper
