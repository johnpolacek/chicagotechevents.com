import { useContext } from 'react';
import { SponsorContext } from "./SponsorContext";

const useSponsorData = () => {
  const [state, setState] = useContext(SponsorContext);

  function setSponsorName(name) {
    setState(state => ({ ...state, sponsorName: name }));
  }

  function setSponsorLink(link) {
    setState(state => ({ ...state, sponsorLink: link }));
  }

  function setSponsorImageUpload(img) {
    setState(state => ({ ...state, sponsorImageUpload: img }));
  }

  function setSponsorWeek(week) {
    setState(state => ({ ...state, sponsorWeek: week.split('T')[0] }));
  }

  return {
    sponsorName: state.sponsorName || '',
    sponsorLink: state.sponsorLink || '',
    sponsorImageUpload: state.sponsorImageUpload || null,
    sponsorWeek: state.sponsorWeek ||  null,
    setSponsorName,
    setSponsorLink,
    setSponsorImageUpload,
    setSponsorWeek
  }
};

export default useSponsorData;
