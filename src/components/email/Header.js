import React from 'react'
import theme from '../../theme'

export default props => (
  <div style={{ position: 'relative', background: theme.colors.blue7, color: '#fff', textAlign: 'center', padding: '32px 32px 25%' }}>
    <div style={{ maxWidth: '800px', zIndex: '999', margin: '0 auto -16px' }}>
      <h1 style={{margin: '8px 0 40px', fontWeight:'normal', fontSize: '40px'}}>{props.title.toUpperCase()}</h1>
      <div style={{ margin:"auto", maxWidth:'480px'}}>
        <div style={{ borderTop: 'solid 1px white' }}>
          <div style={{ display:"inline-block", background:"white", padding: "6px 8px 2px", position:"relative", top:"-18px" }}>
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="/img/chicago-star.svg" />
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="/img/chicago-star.svg" />
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="/img/chicago-star.svg" />
            <img alt="Chicago Star Icon" style={{ margin: '0 4px' }} width="24px" height="24px" src="/img/chicago-star.svg" />
          </div>
        </div>
      </div>
    </div>
    <img alt="Chicago Skyline Graphic" src="/img/skyline.svg" style={{ display:"block", position:"absolute", bottom:"-1px", left:"-2px", width:"101%" }} />
  </div>
)
