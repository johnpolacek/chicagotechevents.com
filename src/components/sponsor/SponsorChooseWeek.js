import React from 'react'
import PropTypes from 'prop-types'
import { Div, H3, Label, Span } from 'styled-system-html'

const SponsorChooseWeek = props => {
  return (
    <Div>
      <H3 fontWeight="300" color="blue" fontSize={4} pb={4}>CHOOSE A WEEK</H3>
      <Div borderTop="solid 1px" borderColor="gray2" width="300px" mx="auto">
        {
          props.weeksAvailable.map(week => {
            const date = new Date(week)
            return (
              <Div key={date.toJSON()} borderBottom="solid 1px" borderColor="gray2" fontSize={3} py={3}>
                <Label style={{cursor:'pointer'}}>
                  <Span position="relative" top="-5px"><input onChange={e => props.onChooseWeek(e.target.value)} type="radio" name="sponsorWeek" value={week} /></Span>
                  <Span textAlign="left" pl={4} display="inline-block" width="200px">{date.getMonth()+1} / {date.getDate()} / {date.getFullYear()}</Span>
                </Label>
              </Div>
            )
          })
        }
      </Div>
    </Div>
  )
}

SponsorChooseWeek.propTypes = {
  weeksAvailable: PropTypes.array.isRequired,
  onChooseWeek: PropTypes.func.isRequired,
}

export default SponsorChooseWeek
