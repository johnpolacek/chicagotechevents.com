import React from 'react'
import theme from '../../theme'

export default props => (
  <div style={{ position: 'relative', background: theme.colors.blue7, padding: '32px 32px 25%', textAlign: 'center' }}>
    <div style={{ zIndex: '999', margin: '0 auto -16px' }}>
      <h1 style={{margin: '8px 0 40px', fontWeight:'normal', fontSize: '40px', color: '#fff', textAlign: 'center' }}>{props.title.toUpperCase()}</h1>
      <div style={{ margin:"auto", maxWidth:'480px'}}>
        <div style={{ borderTop: 'solid 1px white' }}>
          <div style={{ display:"inline-block", background:"white", padding: "6px 8px 2px", position:"relative", top:"-18px" }}>
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="https://chicagotechevents.netlify.com/img/chicago-star.png" />
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="https://chicagotechevents.netlify.com/img/chicago-star.png" />
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="https://chicagotechevents.netlify.com/img/chicago-star.png" />
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="https://chicagotechevents.netlify.com/img/chicago-star.png" />
          </div>
        </div>
      </div>
    </div>
    <img alt="Chicago Skyline Graphic" src="https://chicagotechevents.netlify.com/img/skyline.png" style={{ display:"block", position:"absolute", bottom:"-1px", left:"-2px", width:"101%" }} />
  </div>
)
