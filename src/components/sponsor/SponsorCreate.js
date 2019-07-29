import React from 'react'
import PropTypes from 'prop-types'
import { Div, A } from 'styled-system-html'
import useSponsorData from "./useSponsorData";
import SponsorChooseWeek from './SponsorChooseWeek'
import SponsorAdCreate from './SponsorAdCreate'


const SponsorCreate = props => {

  const { sponsorWeek, setSponsorWeek } = useSponsorData();

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
            <SponsorAdCreate>
              <Div py={2} fontSize={0} fontWeight="bold">
                Sponsorship week start date: {sponsorWeekReadable}<br/>
                <A href="#" color="blue" onClick={e => {e.preventDefault(); setSponsorWeek(null)}}>change</A>
              </Div>
            </SponsorAdCreate>
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
