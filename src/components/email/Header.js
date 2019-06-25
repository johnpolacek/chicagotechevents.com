import React from 'react'
import theme from '../../theme'

export default props => (
  <>
    <tr style={{ background: theme.colors.blue7, textAlign: 'center' }}>
      <td style={{ padding: '32px 0 8px' }}>
        <h1 style={{margin: '8px 0 0', fontWeight:'normal', fontSize: '42px', color: '#fff !important', textAlign: 'center' }}>{props.title.toUpperCase()}</h1>
      </td>
    </tr>
    <tr>
      <td>
        <img alt="Chicago Stars and Skyline" style={{width:'100%',height:'auto'}} src="https://chicagotechevents.netlify.com/img/email-header.gif" />
      </td>
    </tr>
  </>
)
