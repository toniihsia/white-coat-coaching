import React from 'react';
import { Link, hashHistory } from 'react-router';
import ResidencyItemContainer from './residency_item_container';
import GoogleMapContainer from '../googlemap/google_map_container';
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
      this.setState(null);
    }
    else {
      this.setState(data);
    }
    console.log(this.state);
  }

  render() {
    return (
      <div className="residency-index">
        <ul className="residency-item-container">
          {this.props.residencies.map((residency,i) =>(
            <ResidencyItemContainer key={i} handleClick={this.handleClick} residency={residency} selected={this.state && (this.state.lat === residency.latitude)}/>
          ))}
        </ul>
        <GoogleMapContainer data = {this.state}/>
      </div>
    );
  }
}

export default ResidencyIndex;
