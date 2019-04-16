import React, { useState } from "react"
import PropTypes from "prop-types"
import { Div, Select, Span } from "styled-system-html"

const Timepicker = props => {
  const [time, setTime] = useState(props.defaultTime || "")

  const onHourChange = newHour => {
    setTime(newHour + time.split(":")[1])
    if (props.onChange) {
      props.onChange(time)
    }
  }

  const onMinutesChange = newMinutes => {
    setTime(
      time.split(":")[0] + ":" + newMinutes + time.split(":")[1].substring(2)
    )
    if (props.onChange) {
      props.onChange(time)
    }
  }

  const onPeriodChange = newPeriod => {
    setTime(
      time.split(":")[0] + ":" + time.split(":")[1].substring(0, 2) + newPeriod
    )
    if (props.onChange) {
      props.onChange(time)
    }
  }

  return (
    <Div>
      <Select
        defaultValue={props.defaultTime ? props.defaultTime.split(":")[0] : ""}
        onChange={e => {
          onHourChange(e.target.value)
        }}
        id={props.id + "-hours"}
      >
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
      <Span px={1} fontWeight="bold">
        :
      </Span>
      <Select
        defaultValue={
          props.defaultTime
            ? props.defaultTime.split(":")[1].substring(0, 2)
            : ""
        }
        onChange={e => {
          onMinutesChange(e.target.value)
        }}
        id={props.id + "-minutes"}
      >
        <option>00</option>
        <option>15</option>
        <option>30</option>
        <option>45</option>
      </Select>
      <Select
        defaultValue={
          props.defaultTime ? props.defaultTime.split(":")[1].substring(2) : ""
        }
        onChange={e => {
          onPeriodChange(e.target.value)
        }}
        ml={2}
        id={props.id + "-period"}
      >
        <option>am</option>
        <option>pm</option>
      </Select>
      <input
        type="hidden"
        id={props.id}
        name={props.name || props.id}
        value={time}
      />
    </Div>
  )
}

Timepicker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultTime: PropTypes.string,
}

export default Timepicker
