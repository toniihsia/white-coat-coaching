import React from 'react';
import HeaderContainer from './header/header_container';
import ResidencyIndexContainer from './residencies/residency_index_container';

const App = ({ children }) => (
  <div>
    <HeaderContainer />
    <h3>White Coat Coaching Maps</h3>
    <ResidencyIndexContainer />
  </div>
);

export default App;
