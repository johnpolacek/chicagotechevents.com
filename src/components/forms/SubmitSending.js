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
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#0077cc"
          stroke-width="5"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
          transform="rotate(17.9129 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </Div>
    <P pt={3} pb={4} width={1} color="blue">
      Sending event...
    </P>
  </SubmitEventMessage>
)
