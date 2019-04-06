import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import Timepicker from './Timepicker'
import { Div } from 'styled-system-html'
import FormControl from './FormControl.js'

const FormControlDateTime = (props) => (
	<FormControl label={props.label} type="custom" id={props.id} labelAddendum={props.labelAddendum}>
		<Div width={1} display="flex" flexWrap="wrap" mb={3}>
			<Div width={1/2}>
				<DatePicker selected={props.dateValue} onChange={props.onDateChange}/>
			</Div>
			<Div width={[1,1/2]} pl={[0,2]}>
				<Timepicker id={props.id} defaultTime={props.timeValue} onChange={props.onTimeChange} />
			</Div>
		</Div>
	</FormControl>
)

FormControlDateTime.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelAddendum: PropTypes.string,
  dateValue: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  timeValue: PropTypes.string,
  onTimeChange: PropTypes.func.isRequired
}

export default FormControlDateTime