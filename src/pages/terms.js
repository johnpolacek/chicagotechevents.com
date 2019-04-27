import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Wrapper from '../components/Wrapper'

class Privacy extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        description={siteDescription}
      >
        <SEO
          title="Privacy New Event"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <Wrapper fontSize="80%">
          <h2>Terms of Service Agreement</h2>
          <p><em>Updated April 27, 2019</em></p>
          <p>The Chicago Tech Events website is available to you with the following terms of service. When using chicagotechevents.com and its services, you are deemed to have accepted these terms of service, along with any additional terms of service which expressly apply to services and information provided by third parties.</p>
          <p>Chicago Tech Events reserves the right to modify these terms and conditions. We will indicate such updates by stating the latest modification date on the Terms of Service section of the website. When changes are significant, we may email registered users with the revised terms and conditions. The revised terms and conditions will be deemed to have been accepted by you if you continue to use the web site and our services after the latest modification date.</p>
          <p>Chicago Tech Events reserves the right to refuse service to anyone for any reason at any time.</p>
          <p>If you require more information or have questions about our terms of service, contact us by email at <a href="mailto:chicagotechevents@gmail.com">chicagotechevents@gmail.com</a></p>
          <p>Chicago Tech Events may not monitor or control all content and data. Any use of or reliance on any content or materials on Chicago Tech Events is at your own risk. Chicago Tech Events does not guarantee the security of our servers or databases, or that information you supply will not be intercepted while being transmitted.</p>
          <p>Chicago Tech Events does not represent or guarantee the completeness, accuracy, or reliability of any content or communications on the Chicago Tech Events website and services, or endorse any opinions expressed on the Chicago Tech Events website and services. By using Chicago Tech Events, you may be exposed to content that might be offensive, harmful, inaccurate or otherwise inappropriate. Under no circumstances will Chicago Tech Events be liable in any way for any content, including, but not limited to, errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of any content made available via the the Chicago Tech Events website and services, or broadcast elsewhere.</p>
          <h4>Privacy Policy</h4>
          <p>Refer to the Chicago Tech Events privacy policy for information about the handling of user information.</p>
          <h4>Service availability</h4>
          <p>Chicago Tech Events attempts to deliver continuous availability of the website and services available on it, but accepts no responsibility for consequences of delays or interruptions, however caused. Chicago Tech Events may change or update the design and content of the site and services at any time.</p>
          <p>The liability of Chicago Tech Events for any loss or damage suffered by you as the result of your use of this site is limited to your actual direct damages and, except in the case of fraud, excludes any loss of future earnings, profit or prospects or any consequential or speculative loss.</p>
          <h4>Event Submissions</h4>
          <p>When submitting content to Chicago Tech Events, you grant Chicago Tech Events and other users of Chicago Tech Events Services a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content in any and all media or distribution methods (now known or later developed).</p>
          <p>When uploading content to Chicago Tech Events, you warrant, represent and agree that you have the right to grant Chicago Tech Events the license described in the Terms of Service. You also agree you have not and will not contribute any content that:</p>
          <ul>
            <li>infringes, violates or interferes with any copyright or trademark of another party, reveals any trade secret, infringes intellectual property, privacy or publicity right of another party;</li>
            <li>is libelous, defamatory, abusive, harassing, offensive or otherwise violates any law or right of any third party;</li>
            <li>creates an impression that you know is incorrect or deceptive, including by impersonating others or otherwise misrepresenting your affiliation with a person or entity;</li>
            <li>contains other people's private or personally identifiable information without their express authorization and permission;</li>
            <li>contains or links to a virus, trojan horse, worm, time bomb or other computer programming routine or engine that is intended to damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or information;</li>
          </ul>
          <p>Chicago Tech Events reserves the right to remove any content from the Chicago Tech Events website and services, or terminate your account at any time.</p>
          <p>As a condition of your use of Chicago Tech Events, you agree to provide accurate information when registering for an account and submitting data, and updating accuracy and completeness of such information when necessary.</p>
          <p>Chicago Tech Events reserve the right to access, read, preserve, and disclose any information as we reasonably believe is necessary to:</p>
          <ul>
            <li>satisfy any applicable law, regulation, legal process or governmental request;</li>
            <li>enforce the Terms of Service, including investigation of potential violations hereof;</li>
            <li>detect, prevent, or otherwise address fraud, security or technical issues;</li>
            <li>respond to user support requests;</li>
            <li>protect the rights, property or safety of Chicago Tech Events, its users and the public;</li>
          </ul>
          <br/>          
          <h4>Email Newsletter</h4>
          <p>If you join our email list by registering for the Chicago Tech Events newsletter, we will have a record of your email address and other information you choose to provide. Chicago Tech Events will not share your email address or other information with outside parties, with the exception of <a href="http://mailchimp.com">Mailchimp</a>, the Chicago Tech Events email service provider.</p>
          <h4>Social Media</h4>
          <p>Social media buttons allow you to share content from Chicago Tech Events through social media. These buttons are controlled by social media cookies that are installed by the social media parties, so they are able to recognise you when you would like to share articles or videos.</p>
          <p>These cookies enable logged-in users of selected social media to instantly share content that is available on our website. With regard to the cookies that the social media parties install and any data they thereby collect, please refer to the statements that these parties have published on their own websites. Be aware that these statements may regularly change.</p>
          <h4>Credit Card Payments</h4>
          <p>Chicago Tech Events accepts payments for sponsorships and job listings through its 3rd party payment platform, Stripe. Chicago Tech Events embeds a payment for you to create a Stripe account to process credit and debit card transactions through the Stripe API. Your credit card information is not saved in the Chicago Tech Events database or servers it directly controls.</p>
          <p>When making payments and agreeing to the Chicago Tech Events Terms of Service, you also agree that:</p>
          <ul>
            <li>you accept and will comply with <a href="https://stripe.com/us/terms/">Stripe’s Terms of Service</a>;</li>
            <li>you will not process stolen or unauthorized credit cards through Stripe or Your Chicago Tech Events account.</li>
            <li>Chicago Tech Events shall not be liable for any payments and monetary transactions occurring through your use of Stripe or Chicago Tech Events;</li>
            <li>Chicago Tech Events shall not be liable for any issues regarding any transactions between you and any other party, including Stripe;</li>
            <li>it is your responsibility to verify transactions are processed successfully;</li>
            <li>Chicago Tech Events is not liable for loss or damage from any errant or invalid transactions;</li>
            <li>that the Stripe API is subject to change at any time and such changes may adversely affect Chicago Tech Events and its provided services, including job listings and sponsorships;</li>
          </ul>
        </Wrapper>
      </Layout>
    )
  }
}

export default Privacy

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
