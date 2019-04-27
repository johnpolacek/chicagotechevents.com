import React from 'react'
import Wrapper from './Wrapper'
import FooterItem from './FooterItem'
import { Footer, Div } from 'styled-system-html'
import { Link } from 'gatsby'

export default () => (
  <Footer pb={5}>
    <Wrapper display={['block', 'flex']} borderTop="solid 1px"  borderColor="gray2" pt={4} px={2} fontSize={0}>
      <Div width={[1, 1 / 2]} textAlign={['center', 'left']}>
        <FooterItem>Built with <a href="https://www.gatsbyjs.org">Gatsby</a></FooterItem>
        <FooterItem>by <a href="http://johnpolacek.com/">Chicago Web Developer John Polacek</a></FooterItem>
        <FooterItem>Based on <a href="https://github.com/johnpolacek/gatsby-starter-events-list">Gatsby Events List Starter</a></FooterItem>
        <FooterItem>Deployed with <a href="https://www.netlify.com/">Netlify</a></FooterItem>
        <FooterItem>Open sourced on <a href="https://github.com/johnpolacek/chicagotechevents.com">Github</a></FooterItem>
        <FooterItem mt={3}>© {new Date().getFullYear()} John Polacek</FooterItem>
        <FooterItem><Link to="./terms">Terms of Service</Link></FooterItem>
        <FooterItem><Link to="./privacy">Privacy Policy</Link></FooterItem>
      </Div>
      <Div width={[1, 1 / 2]} textAlign={['center', 'right']}>
        <FooterItem>Follow <a href="https://twitter.com/ChicagoTechEvnt">@ChicagoTechEvnt</a></FooterItem>
        <FooterItem mt={3}>For more Chicago tech check out:</FooterItem>
        <FooterItem><a href="https://www.builtinchicago.org">Built In Chicago</a></FooterItem>
        <FooterItem><a href="https://www.meetup.com/find/?offset=0&psize=64&currentpage=1&categories=34&keywords=&radius=10&userFreeform=Chicago%2C+Illinois%2C+USA&mcId=&mcName=Chicago%2C+IL&lat=41.88&lon=-87.62&sort=member_count">Chicago Tech Meetups</a></FooterItem>
        <FooterItem><a href="https://1871.com">1871 Chicago</a></FooterItem>
        <FooterItem><a href="http://chicagocamps.org/">Chicago Camps</a></FooterItem>
        <FooterItem><a href="http://bytesoverbagels.com/">Bytes Over Bagels Podcast</a></FooterItem>
        <FooterItem><a href="https://eightbitstudios.com/">Eight Bit Studios</a></FooterItem>
      </Div>
    </Wrapper>
  </Footer>
)
