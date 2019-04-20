import React from 'react'
import SubmitEventMessage from './SubmitEventMessage'
import { Div, P } from 'styled-system-html'

export default props => (
  <SubmitEventMessage>
    <Div width={72}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30.258 30.258"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            style={{ fill: '#0077cc' }}
            d="M15.129,0C6.773,0,0,6.772,0,15.13c0,8.354,6.773,15.128,15.129,15.128s15.129-6.773,15.129-15.128 C30.258,6.772,23.484,0,15.129,0z M15.129,27.854c-7.027,0-12.725-5.697-12.725-12.726c0-7.026,5.697-12.725,12.725-12.725 s12.727,5.698,12.727,12.725C27.855,22.156,22.156,27.854,15.129,27.854z"
          />
          <path
            style={{ fill: '#0077cc' }}
            d="M25.854,9.989l-1.762-1.762c-0.322-0.324-0.85-0.324-1.172,0L12.361,18.786l-5.023-5.061 c-0.324-0.323-0.848-0.323-1.174,0l-1.76,1.761c-0.324,0.322-0.324,0.851,0,1.175l5.586,5.626l0.016,0.025l1.219,1.219l0.283,0.281 l0.26,0.262c0.322,0.32,0.85,0.32,1.174,0l12.912-12.912C26.178,10.839,26.178,10.312,25.854,9.989z"
          />
        </g>
      </svg>
    </Div>
    <P pt={3} pb={4} width={1} color="blue">
      Thanks for sending your event!
    </P>
  </SubmitEventMessage>
)
