import React from 'react'
import { Footer, Div, P } from 'styled-system-html'

export default () => (
  <Footer
    fontSize={0}
    borderTop="solid 2px"
    borderColor="gray2"
    py={4}
    px={[3, 0]}
  >
    <Div width={1} mx="auto" p={3} style={{maxWidth:'800px',zIndex:'999'}} display={['block', 'flex']}>
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
    </Div>
  </Footer>
)
