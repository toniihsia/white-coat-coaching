import React from 'react';
import HeaderContainer from './header/header_container';
import SearchBarContainer from './search_bar/search_bar_container';

const App = ({ children }) => (
  <div>
    <HeaderContainer className="top"/>
    <img id="web-title" src="http://res.cloudinary.com/dfrrpfeus/image/upload/v1486792802/Untitled_vorvyz.png" />
    <SearchBarContainer />
  </div>
);

export default App;
