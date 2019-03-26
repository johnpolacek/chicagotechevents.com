import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, Select, Span } from 'styled-system-html'

const Timepicker = (props) => {
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    const [period, setPeriod] = useState('')
    const [time, setTime] = useState('')

    const onTimeChange = (valueSet, value) => {
        valueSet(value)
        setTime(hours + ':' + minutes + ' ' + period)
        if (props.onChange) {
            props.onChange(time)
        }
    }

    return (
        <Div>
            <Select defaultValue={props.defaultHours} onChange={(e) => { onTimeChange(setHours, e.target.value) }} id={props.id+'-hours'}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </Select>
            <Span px={1} fontWeight="bold">:</Span>
            <Select defaultValue={props.defaultMinutes} onChange={(e) => { onTimeChange(setMinutes, e.target.value) }} id={props.id+'-minutes'}>
                <option>00</option>
                <option>15</option>
                <option>30</option>
                <option>45</option>
            </Select>
            <Select defaultValue={props.defaultPeriod} onChange={(e) => { onTimeChange(setPeriod, e.target.value) }} ml={2} id={props.id+'-period'}>
                <option>am</option>
                <option>pm</option>
            </Select>
            <input type="hidden" id={props.id} name={props.name || props.id} value={time} />
        </Div>
    )
}
      
Timepicker.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultMinutes: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    defaultHours: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    defaultPeriod: PropTypes.string
}

export default Timepicker
