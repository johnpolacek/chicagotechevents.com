import React, { useState } from 'react'
import FormControl from '../forms/FormControl'
import InputSubmit from '../forms/InputSubmit'
import { Div, Form, Label, Input, Span, Img, A } from 'styled-system-html'

const SponsorAdForm = props => {
  const SUBMIT_READY = 'SUBMIT_READY'
  const SUBMIT_SENDING = 'SUBMIT_SENDING'
  const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
  const SUBMIT_FAIL = 'SUBMIT_FAIL'
  const [submitState, setSubmitState] = useState(SUBMIT_READY)
  const [SponsorName, setSponsorName] = useState('')
  const [sponsorImageUpload, setSponsorImageUpload] = useState(null)

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
        setSubmitState(SUBMIT_READY)
      }
    }
  }

  const onSponsorSubmit = e => {
    if (e.target.checkValidity()) {
      e.preventDefault()
      setSubmitState(SUBMIT_SENDING)
      return fetch(`/.netlify/functions/add-sponsor/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({file:sponsorImageUpload.data}),
      })
        .then(response => response.json())
        .then(data => {
          try {
            if (data.message === 'success') {
              setSubmitState(SUBMIT_SUCCESS)
            } else {
              setSubmitState(SUBMIT_FAIL)
            }
          } catch (err) {
            setSubmitState(SUBMIT_FAIL)
          }
        })
    }
  }

  return (
    <Form textAlign="left" onSubmit={onSponsorSubmit} p={4}>
      <FormControl
        label="Sponsor Name"
        type="text"
        id="SponsorName"
        value={SponsorName}
        setValue={setSponsorName}
      />
      <Label fontSize={1} fontWeight="500" htmlFor="sponsorImage" display="block" pb={2}>
        Your sponsorship image <br/>
        <Span color="gray8" fontSize={0} fontWeight="300">(will be resized to 1200x400 pixels)</Span>
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
      <Div pt={3} pb={5} mb={4} textAlign="right">
        <InputSubmit disabled={submitState !== SUBMIT_READY} id="submitSponsor" value="SUBMIT" />
      </Div>
    </Form>
  )
}

export default SponsorAdForm
