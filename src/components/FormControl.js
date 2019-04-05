// <FormControl label="Name of Event" type="input" id={props.id} value={props.value} type={type} setValue={setEventName} />

import React from 'react'
import PropTypes from 'prop-types'
import { Div } from 'styled-system-html'

const FormControl = (props) => (
	<>
		<Label pb={1} display="block" htmlFor={props.id}>{props.label}</Label>
		<Input name={props.id} type={props.type} onChange={e => props.setValue(e.target.value)} required width={1} mb={3} value={props.value} />
	</>
)

FormControl.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
}

export default FormControl