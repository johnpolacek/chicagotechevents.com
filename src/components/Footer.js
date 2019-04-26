import React from 'react'
import Wrapper from './Wrapper'
import { Footer, Div, P } from 'styled-system-html'

export default () => (
  <Footer>
    <Wrapper display={['block', 'flex']} borderTop="solid 1px"  borderColor="gray2" pt={4} px={2}>
      <Div width={[1, 1 / 2]} textAlign={['center', 'left']}>
        <P mb={1}>© {new Date().getFullYear()} John Polacek</P>
        <P>
          Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </P>
      </Div>
      <Div width={[1, 1 / 2]} textAlign={['center', 'right']}>
        <P mb={1}>
          Twitter: <a href="https://twitter.com/johnpolacek">@johnpolacek</a>
        </P>
        <P mb={1}>
          Github:{' '}
          <a href="https://github.com/johnpolacek">github.com/johnpolacek</a>
        </P>
      </Div>
    </Wrapper>
  </Footer>
)
