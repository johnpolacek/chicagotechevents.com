import React from "react"
import PropTypes from "prop-types"
import { Div } from "styled-system-html"

const MonthHeader = props => (
  <Div
    color="base"
    fontWeight="bold"
    fontSize={0}
    borderTop="solid 2px"
    borderBottom="solid 2px"
    borderColor="gray2"
    textAlign="center"
    lineHeight="1"
    py={2}
    mt={2}
    mb={4}
  >
    {props.month.toUpperCase()}
  </Div>
)

MonthHeader.propTypes = {
  month: PropTypes.string.isRequired,
}

export default MonthHeader
