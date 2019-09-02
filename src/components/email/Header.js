import React from 'react'
import theme from '../../theme'
import { Div } from 'styled-system-html'

export default props => (
  <thead>
    <Div style={{ background: theme.colors.blue7, textAlign: 'center' }}>
      <Div style={{ padding: '32px 0 8px', margin: '8px 0 0', fontWeight:'normal', fontSize: '42px', color: '#fff', textAlign: 'center' }}>{props.title.toUpperCase()}</Div>
    </Div>
    <Div>
      <Div>
        <img alt="Chicago Stars and Skyline" style={{width:'100%',height:'auto'}} src="https://chicagotechevents.com/img/email-header.gif" />
      </Div>
    </Div>
  </thead>
)
