import React from 'react'
import Wrapper from '../../layout/Wrapper'
import HeaderTitle from './HeaderTitle'
import HeaderDescription from './HeaderDescription'
import HeaderLink from './HeaderLink'
import StarBar from '../StarBar'
import { Header, Img } from 'styled-system-html'

export default props => (
  <Header
    bg="blue7"
    color="white"
    textAlign="center"
    pt={[3, 4]}
    pb={[5, 6]}
    mb={[-3, -4, -4, -5]}
    position="relative"
  >
    <Wrapper mb={-2}>
      <HeaderTitle link={props.path !== '/'}>{props.title.toUpperCase()}</HeaderTitle>
      <StarBar mt={[-3, -4, -4, 0]} />
      <HeaderDescription>{props.description}</HeaderDescription>
      {props.path.replace(/\/$/, '') === '/submit' ? (
        <HeaderLink to={'/'}>VIEW EVENTS</HeaderLink>
      ) : (
        <HeaderLink to={'/submit'}>+ ADD NEW EVENT</HeaderLink>
      )}
    </Wrapper>
    <Img
      display="block"
      position="absolute"
      bottom="-1px"
      left="0"
      width="101%"
      src="/img/skyline.svg"
    />
  </Header>
)
