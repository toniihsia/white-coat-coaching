import React from 'react';
import { Link, hashHistory } from 'react-router-3';

class ResidencyItemInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='res-url'>{this.props.website_url}</div>
        <div className='res-description'>{this.props.description}</div>
      </div>
    );
  }
}

export default ResidencyItemInfo;
