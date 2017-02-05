import React from 'react';
import HeaderContainer from './header/header_container';
import ResidencyIndexContainer from './residencies/residency_index_container';

const App = ({ children }) => (
  <div>
    <HeaderContainer />
    <div className='title'>White Coat Coaching Maps</div>
    <ResidencyIndexContainer />
  </div>
);

export default App;
