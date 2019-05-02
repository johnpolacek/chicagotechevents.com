import React from 'react'
import PropTypes from 'prop-types'
import { Div, Img, Span } from 'styled-system-html'

const MonthHeader = props => (
  <Div
    display="flex"
    justifyContent="center"
    alignItems="center"
    color="red"
    fontWeight="bold"
    fontSize={0}
    borderTop="solid 1px"
    borderBottom="solid 1px"
    borderColor="cyan"
    textAlign="center"
    py={2}
    mt={2}
    mb={4}
  >
    <Img mx={1} width={16} height={16} src="/img/chicago-star.png" />
    <Span mx={2} position="relative" top="1px">
      {props.month.toUpperCase()}
    </Span>
    <Img mx={1} width={16} height={16} src="/img/chicago-star.png" />
  </Div>
)

MonthHeader.propTypes = {
  month: PropTypes.string.isRequired,
}

export default MonthHeader
