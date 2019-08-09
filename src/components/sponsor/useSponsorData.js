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

  function setSponsorToken(token) {
    setState(state => ({ ...state, sponsorToken: token }));
  }

  return {
    sponsorName: state.sponsorName || '',
    sponsorLink: state.sponsorLink || '',
    sponsorImageUpload: state.sponsorImageUpload || null,
    sponsorWeek: state.sponsorWeek ||  null,
    sponsorToken: state.sponsorToken || null,
    setSponsorName,
    setSponsorLink,
    setSponsorImageUpload,
    setSponsorWeek,
    setSponsorToken
  }
};

export default useSponsorData;
