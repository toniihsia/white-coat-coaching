import React from 'react';
import { Link, hashHistory } from 'react-router';

class ResidencyItem extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e){
    e.stopPropagation();
    let data = {id: this.props.residency.id, lat: this.props.residency.latitude,long: this.props.residency.longitude,
      description: this.props.residency.description};
    this.props.handleClick(data);
  }

  render() {
    return (
      <li className={`residency-item ${this.props.selected ? 'selected-item' : ''}`} onClick={this._handleClick}>
        {this.props.residency.name}
        {this.props.residency.website_url}
      </li>
    );
  }
}

export default ResidencyItem;
