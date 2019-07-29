import { useContext } from 'react';
import { SponsorContext } from "./SponsorContext";

const useSponsorData = () => {
  const [state, setState] = useContext(SponsorContext);

  function setSponsorWeek(week) {
    console.log('setSponsorWeek',week)
    setState(state => ({ ...state, sponsorWeek: week }));
  }

  return {
   sponsorWeek: state.sponsorWeek ||  null,
   setSponsorWeek
  }
};

export default useSponsorData;
