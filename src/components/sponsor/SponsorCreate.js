import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, A } from 'styled-system-html'
import SponsorChooseWeek from './SponsorChooseWeek'
import SponsorAdCreate from './SponsorAdCreate'


const SponsorCreate = props => {
  
  const [sponsorWeek, setSponsorWeek] = useState(null)

  let sponsorWeekReadable = ''
  if (sponsorWeek) {
    const date = new Date(sponsorWeek)
    sponsorWeekReadable = (date.getMonth()+1) + '/' +date.getDate() + '/' + date.getFullYear()
  }

  return (
    <Div py={4} position="relative">
      {
        sponsorWeek ? (
          <>
            <Div position="absolute" top="0" right="0" fontSize={0} pt="40px" pr={3} textAlign="right">
              Week: {sponsorWeekReadable}<br/>
              <A href="#" color="blue" onClick={e => {e.preventDefault(); setSponsorWeek(null)}}>change</A>
            </Div>
            <SponsorAdCreate />
          </>
        ) : (
          <SponsorChooseWeek weeksAvailable={props.weeksAvailable} onChooseWeek={week => setSponsorWeek(week)} />
        )
      }
    </Div>
  )
}

SponsorCreate.propTypes = {
  weeksAvailable: PropTypes.array.isRequired,
}

export default SponsorCreate
