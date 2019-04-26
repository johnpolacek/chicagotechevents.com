import React from 'react'
import { Div, Img } from 'styled-system-html'

const StarBar = props => (
  <Div borderTop="solid 1px" borderColor="white" {...props}>
    <Div
      display="inline-block"
      bg="white"
      pt="6px"
      px={2}
      pb="2px"
      position="relative"
      top="-18px"
    >
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
    </Div>
  </Div>
)

export default StarBar
