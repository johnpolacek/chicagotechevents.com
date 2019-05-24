import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme.js'
import './Layout.css'
import Body from './Body'
import Header from '../ui/header/Header'
import Footer from '../ui/footer/Footer'
import { Main } from 'styled-system-html'

export default props => (
  <ThemeProvider theme={theme}>
    <Body>
      <Header
        path={props.location.pathname}
        title={props.title}
        description={props.description}
      />
      <Main bg="lite" px={[3, 0]}>
        {props.children}
      </Main>
      <Footer />
    </Body>
  </ThemeProvider>
)
