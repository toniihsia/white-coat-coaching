import React from 'react';
import HeaderContainer from './header/header_container';
import SearchBarContainer from './search_bar/search_bar_container';

const App = ({ children }) => (
  <div>
    <HeaderContainer />
    <div className='title'>White Coat Coaching Maps</div>
    <SearchBarContainer />
  </div>
);

export default App;
