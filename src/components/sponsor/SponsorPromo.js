import React from 'react'
import { Link } from 'gatsby'
import LinkButton from '../ui/LinkButton'
import { Div, P } from 'styled-system-html'

const SponsorPromo = props => (
  <Div
    p={4}
    mt={-4}
    mb={4}
    bg="cyan"
    color="white"
    textAlign="center"
  >
    <P fontSize={3} fontWeight="bold" mb={2}>This Space Available</P>
    <P width={[1,360]} mx="auto">Promote your product, service or event<br/>to hundreds Chicago Tech Enthusiasts!</P>
    <Div pb={3}>
      <Link style={{ textDecoration: 'none' }} to="./sponsor">
        <LinkButton bg="base" fontSize={2}>Become a Sponsor</LinkButton>
      </Link>
    </Div>
  </Div>
)

export default SponsorPromo
