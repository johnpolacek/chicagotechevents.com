import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { H2, H3 } from 'styled-system-html'
import theme from '../../theme'

const StyledLink = styled(props => <Link {...props} />)`
  color: ${theme.colors.base};
`

const EventHeader = props => (
  <>
    {props.url ? (
      <H3 fontSize={[3, 4]}>
        <StyledLink to={props.url}>{props.title}</StyledLink>
      </H3>
    ) : (
      <H2 color="base" fontSize={[3, 4]}>
        {props.title}
      </H2>
    )}
  </>
)

EventHeader.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default EventHeader
