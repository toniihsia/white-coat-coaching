import React from 'react';
import { Link, hashHistory } from 'react-router';
import ResidencyItemContainer from './residency_item_container';
import GoogleMapContainer from '../googlemap/google_map_container';
import { isEqual } from 'lodash';

class ResidencyIndex extends React.Component {
  constructor(props) {
    super(props);

    this.selected = null;

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.requestAllResidencies();
  }

  handleClick(data){
    if (_.isEqual(this.selected, data)){
      this.selected = null;
    }
    else {
      this.selected = data;
    }
    console.log(this.selected);
  }

  render() {
    console.log(this.props.residencies);
    return (
      <div className="residency-index">
        <ul className="residency-item-container">
          {this.props.residencies.map((residency,i) =>(
            <ResidencyItemContainer key={i} handleClick={this.handleClick} residency={residency} selected={this.selected && (this.selected.id === residency.id)}/>
          ))}
        </ul>
        <GoogleMapContainer data = {this.selected}/>
      </div>
    );
  }
}

export default ResidencyIndex;
