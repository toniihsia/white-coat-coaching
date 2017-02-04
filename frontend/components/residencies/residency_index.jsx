import React from 'react';
import { Link, hashHistory } from 'react-router';
import ResidencyItemContainer from './residency_item_container';
import GoogleMap from '../googlemap/google_map';
import { isEqual } from 'lodash';

class ResidencyIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = null;
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.requestAllResidencies();
  }

  handleClick(data){
    if (_.isEqual(this.state, data)){
      this.setState(null)
    }
    else {
      this.setState(data);
    }
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    return (
      <div className="residency-index">
        <ul className="residency-item-container">
          {this.props.residencies.map((residency,i) =>(
            <ResidencyItemContainer key={i} handleClick={this.handleClick} residency={residency} selected={this.state && (this.state.lat === residency.latitude)}/>
          ))}
        </ul>
        <GoogleMap residencies={this.props.residencies} />
      </div>
    );
  }
}

export default ResidencyIndex;
