import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Div } from 'styled-system-html'
import LinkButton from '../LinkButton'

const HeaderLink = props => (
  <Div pb={[3, 4, 5, 6]} mb={[4, 3]}>
    <Link style={{ textDecoration: 'none' }} to={props.to}>
      <LinkButton>{props.children}</LinkButton>
    </Link>
  </Div>
)

HeaderLink.propTypes = {
  to: PropTypes.string.isRequired,
}

export default HeaderLink
