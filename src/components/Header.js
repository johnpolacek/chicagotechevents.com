import React from 'react'
import { Link } from 'gatsby'
import { Header, H1, H2, Div, Span, Img } from 'styled-system-html'

const HeaderLink = props => (
  <Link style={{ textDecoration: 'none' }} to={props.to}>
    <Span bg="cyan" color="white" px={3} py={2} borderRadius="4px" fontSize={0}>{props.children}</Span>
  </Link>
)

export default props => (
  <>
    <Header bg="blue7" color="white" textAlign="center" pt={[3,4]} pb={[5,6]} mb={[-3,-4,-4,-5]} position="relative">
      <Div width={1} px={3} mx="auto" mb={-2} position="relative" style={{maxWidth:'800px',zIndex:99}}>
        <H1 borderBottom="solid 1px" borderColor="white" pt={2} pb={['36px','36px','36px',4]} mb={[5,5,5,4]} fontWeight="normal" fontSize={[5,5,5,6]}>{props.title.toUpperCase()}</H1>
        <Div mt={['-82px','-82px','-82px','-53px']}>
          <Div display="inline-block" bg="white" pt="6px" px={2} pb="2px">
            <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
            <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
            <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
            <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
          </Div>
        </Div>
        <H2 fontSize={[1,2]} fontWeight="normal" pt={3} mt={[0,2,0]} px={4} pb={4}>
          {props.description}
        </H2>
        <Div pb={[3,4,5,6]} mb={[4,3]}>
          { props.path.replace(/\/$/, '') === '/submit' ? (
              <HeaderLink to={'/'}>VIEW EVENTS</HeaderLink>
            ) : (
              <HeaderLink to={'/submit'}>SUBMIT EVENT</HeaderLink>
            )
          }
        </Div>
      </Div>
      <Img display="block" position="absolute" bottom="-1px" left="0" width="101%" src="/img/skyline.svg" />
    </Header>
  </>
)
