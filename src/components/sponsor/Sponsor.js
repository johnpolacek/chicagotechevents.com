import React from 'react'
import PropTypes from 'prop-types'
import { Div } from 'styled-system-html'

const Sponsor = props => (
  <Div
    key={props.url}
    py={5}
    mb={5}
    mt={-4}
    textAlign="center"
    bg="blue2"
    color="white"
  >
    Sponsor goes here. 1200x400 Image will be something like https://chicagotechevents.s3.amazonaws.com/sponsors/{props.sponsor.sponsorDate}.jpg
  </Div>
)

Sponsor.propTypes = {
  url: PropTypes.string
}

export default Sponsor
