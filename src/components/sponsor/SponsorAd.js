import React from 'react'
import { Div, P, A, Img } from 'styled-system-html'

const Sponsor = props => (
  <Div textAlign="center" pt={4} bg="#f6f6f6" mt={-5}>
    <P pb={0} mb={1} fontStyle="italic" fontSize={0} color="gray">
      <span>Thank you to </span>
      <A href={props.sponsor.eventUrl}>{props.sponsor.title}</A>
      <span> for being this week’s sponsor.</span>
    </P>
    <Div
      key={props.sponsor.id}
      mb={5}
      color="white"
    >
      <A href={props.sponsor.eventUrl} p={0}>
        <Img alt={props.sponsor.title} width={1} height="auto" src={'https://docqet-images.s3.us-east-2.amazonaws.com/sponsors/'+props.sponsor.id+'.jpg'} />
      </A>
    </Div>
  </Div>
)

export default Sponsor
