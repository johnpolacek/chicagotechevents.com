import React from 'react'

const Sponsor = props => (
  <>
    <p style={{textAlign:'center', fontStyle:'italic', fontSize:'14px', color:'gray', marginBottom: '8px'}}>
      <span>Thank you to </span>
      <a href={props.sponsor.eventUrl}>{props.sponsor.title}</a>
      <span> for being this week’s sponsor.</span>
    </p>
    <p style={{textAlign:'center', paddingLeft:'48px',paddingRight:'48px'}}>
      <a href={props.sponsor.eventUrl}>
        <img alt={props.sponsor.title} width="100%" height="auto" src={'https://docqet-images.s3.us-east-2.amazonaws.com/sponsors/'+props.sponsor.id+'.png'} />
      </a>
    </p>
  </>
)

export default Sponsor
