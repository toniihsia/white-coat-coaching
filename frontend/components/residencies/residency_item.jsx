import React from 'react';
import { Link, hashHistory } from 'react-router';

class ResidencyItem extends React.Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(e){
    e.stopPropagation();
    let data = {lat: this.props.residency.latitude,lng: this.props.residency.longitude,
      description: this.props.residency.description};
    this.props.handleClick(data);
  }

  render() {
    let residency = this.props.residency;

    return (
      <li className={`residency-item ${this.props.selected ? 'selected-item' : ''}`} onClick={this._handleClick}>
        <div className='res-container'>
          <img className='res-photo' src={residency.image_url} alt={`${residency.name}${residency.id}`} />
          <div className='res-info'>
            <div className='res-title'>{residency.name}</div>
            <div className='res-url'>{residency.website_url}</div>
            <div className='res-description'>{residency.description}</div>
          </div>
        </div>
      </li>
    );
  }
}

export default ResidencyItem;
