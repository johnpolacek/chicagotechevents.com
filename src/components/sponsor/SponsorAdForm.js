import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import useSponsorData from './useSponsorData'
import FormControl from '../forms/FormControl'
import InputSubmit from '../forms/InputSubmit'
import { Div, H3, P, Form, Label, Input, Span, Img, A } from 'styled-system-html'

const SponsorAdForm = props => {

  const STRIPE_PUBLIC_KEY = 'pk_test_e2AvuR0qmELYrmccvofLAKB0'
  // const STRIPE_PUBLIC_KEY = 'pk_live_Ni5Xeg88ULRb8XFDG0hKhrxG'

  const SUBMIT_APPROVE = 'SUBMIT_APPROVE'
  const SUBMIT_PAYMENT = 'SUBMIT_PAYMENT'
  const SUBMIT_PAYCARD = 'SUBMIT_PAYCARD'
  const SUBMIT_SENDING = 'SUBMIT_SENDING'
  const SUBMIT_FAIL = 'SUBMIT_FAIL'
  const [submitState, setSubmitState] = useState(SUBMIT_APPROVE)

  const { 
    sponsorName, setSponsorName, 
    sponsorLink, setSponsorLink, 
    sponsorImageUpload, setSponsorImageUpload, 
    setSponsorToken, 
    sponsorWeek 
  } = useSponsorData()

  const onToken = token => {
    console.log('onToken', token)
    setSponsorToken(token)
    setSubmitState(SUBMIT_SENDING)
    fetch(`/.netlify/functions/add-sponsor/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: sponsorName, link: sponsorLink, file:sponsorImageUpload.data, week: sponsorWeek, token: token}),
    })
      .then(response => response.json())
      .then(data => {
        try {
          if (data.message === 'success') {
            setSponsorToken(token)
          } else {
            setSubmitState(SUBMIT_FAIL)
          }
        } catch (err) {
          setSubmitState(SUBMIT_FAIL)
        }
      })
  }

  const onFileSelect = e => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSponsorImageUpload({
          data: reader.result,
          file: file
        })
      }
    }
  }

  const onSponsorSubmit = e => {
    if (e.target.checkValidity()) {
      e.preventDefault()
      if (submitState === SUBMIT_APPROVE) {
        setSubmitState(SUBMIT_PAYMENT)
      }
    }
  }

  return (
    <Form textAlign="left" onSubmit={onSponsorSubmit} p={4}>
      <Div display={submitState === SUBMIT_APPROVE ? 'block' : 'none'}>
        <FormControl
          label="Sponsor Name"
          type="text"
          id="SponsorName"
          value={sponsorName}
          setValue={setSponsorName}
        />
        <FormControl
          label="Sponsor Link"
          type="text"
          id="SponsorLink"
          value={sponsorLink}
          setValue={setSponsorLink}
        />
        <Label fontSize={1} fontWeight="500" htmlFor="sponsorImage" display="block" pb={2}>
          Your sponsorship image <br/>
          <Span color="gray8" fontSize={0} fontWeight="300">Recommended size: 1200x400 pixels, will be resized to fit within sponsorship area</Span>
        </Label>
        {
          sponsorImageUpload ? (
            <>
              <Img width={1} src={sponsorImageUpload.data} />
              <Div py={2} onClick={e => { e.preventDefault(); setSponsorImageUpload(null) }}>
                <A href="#">Choose a different image</A>
              </Div>
            </>  
          ) : (
            <>
              <Input required bg="white" width={1} onChange={onFileSelect} type="file" name="sponsorImage" />
            </>
          )
        }
      </Div>
      <Div display={submitState === SUBMIT_PAYMENT || submitState === SUBMIT_PAYCARD ? 'block' : 'none'}>
        <H3 pb={3}>Almost Done!</H3>
        <P>All that’s left is to make your payment, then you will be all set.</P>
      </Div>
      {
        submitState === SUBMIT_FAIL && 
        <Div p={4}>
          <P color="red">Sorry there was a problem processing the sponsorship data.</P>
        </Div>
      }
      {
        submitState === SUBMIT_APPROVE && 
        <Div pt={4} pb={5} mb={4} textAlign="right">
          <InputSubmit disabled={submitState !== SUBMIT_APPROVE} id="submitSponsor" value="APPROVE" />
        </Div>
      }
      {
        submitState === SUBMIT_PAYMENT && 
        <Div pt={3} pb={5} mb={4} textAlign="right">
          <A fontSize={1} href="#" mr={4} onClick={ e => { e.preventDefault(); setSubmitState(SUBMIT_APPROVE); } }>edit ad</A>
          <StripeCheckout
            onOpened={() => setSubmitState(SUBMIT_PAYCARD)}
            token={onToken}
            stripeKey={STRIPE_PUBLIC_KEY}
          />
        </Div>
      }
      {
        submitState === SUBMIT_SENDING && 
        <Div textAlign="center" pt={6}>
          <P color="blue" fontStyle="italic">Sending sponsorship data...</P>
        </Div>
      }
    </Form>
  )
}

export default SponsorAdForm
