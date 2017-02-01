import React from 'react';
import HeaderContainer from './header/header_container';
import ResidencyIndexContainer from './residencies/residency_index_container';
import GoogleMapContainer from './googlemap/google_map_container';
// <ResidencyIndexContainer />

const App = ({ children }) => (
  <div>
    <HeaderContainer />
    <h3>White Coat Coaching Maps</h3>
    <GoogleMapContainer />
  </div>
);

export default App;
