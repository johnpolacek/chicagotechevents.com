import React from "react"
import { ThemeProvider } from "styled-components"
import theme from "../theme.js"
import "./Layout.css"
import Body from "./Body"
import Header from "./Header"
import Footer from "./Footer"
import { Main } from "styled-system-html"

export default props => (
  <ThemeProvider theme={theme}>
    <Body>
      <Header
        path={props.location.pathname}
        title={props.title}
        description={props.description}
      />
      <Main px={[4, 0]}>{props.children}</Main>
      <Footer />
    </Body>
  </ThemeProvider>
)
