import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { H1 } from 'styled-system-html'

const StyledLink = styled(props => <Link {...props} />)`
  color: #fff;
  font-weight: normal;
`

const HeaderTitle = props => (
  <H1 mb={[5, 5, 5, 4]} fontWeight="normal" fontSize={[5, 5, 5, 6]} {...props}>
	  {
	  	props.link ? (
        <StyledLink to="/">{props.children}</StyledLink>
      ) : (
        props.children
      )
	  }
  </H1>
)

export default HeaderTitle
