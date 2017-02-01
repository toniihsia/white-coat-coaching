import React from 'react';
import { Link, hashHistory } from 'react-router';
import ResidencyIndexContainer from './residency_item_container'

class ResidencyIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="residency-index">
        <ul className="residency-item-container">
          {this.props.residencies.map((residency,i) =>(
            <li key={i}><ResidencyItemContainer residency={residency}/></li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ResidencyIndex;
