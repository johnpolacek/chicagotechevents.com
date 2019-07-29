import React from 'react'
import { Div, H3 } from 'styled-system-html'
import SponsorAdForm from './SponsorAdForm'
import SponsorAdPreview from './SponsorAdPreview'

const SponsorAdCreate = props => (
  <>
    <H3 fontWeight="300" color="blue" fontSize={4}>CREATE AD</H3>
    {props.children}
    <Div mt={4} px={[0,0,0,3]} display="flex" flexWrap="wrap">
      <Div width={1/3} bg="white">
        <SponsorAdForm />
      </Div>
      <Div width={2/3} py={3} px={4} bg="gray2" textAlign="left">
        <SponsorAdPreview />
      </Div>
    </Div>
  </>
)

export default SponsorAdCreate
