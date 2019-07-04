import React, { useState } from 'react'
import FormControl from '../forms/FormControl'
import Button from '../../components/ui/Button'
import { Div, Form, Label, Span, Img, A } from 'styled-system-html'

const SponsorForm = props => {

  const [personName, setPersonName] = useState('')
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
      }
    }
  }

  const onSponsorSubmit = (e) => {
    e.preventDefault()
    console.log('onSponsorSubmit', sponsorImageUpload)

  }

  return (
    <Form onSubmit={onSponsorSubmit} p={4}>
      <FormControl
        label="Your Name"
        type="text"
        id="personName"
        value={personName}
        setValue={setPersonName}
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
            <input onChange={onFileSelect} type="file" name="sponsorImage" />
          </>
        )
      }
      <Button mt={4} fontSize={2} bg={sponsorImageUpload == null ? 'gray' : 'cyan'} disabled={sponsorImageUpload == null}>Upload</Button>
    </Form>
  )
}

export default SponsorForm
