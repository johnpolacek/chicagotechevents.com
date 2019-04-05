// <FormControl label="Name of Event" type="input" id={props.id} value={props.value} type={type} setValue={setEventName} />

import React from 'react'
import PropTypes from 'prop-types'
import { Div, Label, Input, TextArea, Span } from 'styled-system-html'

const getFormControl = (type) => {
	if (type === 'email') {
		return 'TEXT'
	} else {
		return type.toUpperCase()
	}
}

const FormControl = (props) => (
	<Div pb={2}>
		<Label pb={1} display="block" htmlFor={props.id}>{props.label}{props.labelAddendum ? <Span fontSize={0} pl={1}> {props.labelAddendum}</Span> : ''}</Label>
		<>
          {{
            TEXT: <Input type={props.type} name={props.id} onChange={e => props.setValue(e.target.value)} required width={1} mb={3} value={props.value} />,
            TEXTAREA: <TextArea name={props.id} onChange={e => props.setValue(e.target.value)} required width={1} mb={3} value={props.value} />,
            CUSTOM: <>{props.children}</>
          } [getFormControl(props.type)] }
        </>
		
	</Div>
)

FormControl.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelAddendum: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func
}

export default FormControl