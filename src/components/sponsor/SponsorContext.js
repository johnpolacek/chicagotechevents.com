import React, { useState } from 'react';

const SponsorContext = React.createContext([{}, () => {}]);

const SponsorProvider = (props) => {

  const [state, setState] = useState({
    sponsorWeek: null,
  })

  return (
    <SponsorContext.Provider value={[state, setState]}>
      {props.children}
    </SponsorContext.Provider>
  )
}

export { SponsorContext, SponsorProvider };
