import React from 'react';
import { Link, hashHistory } from 'react-router';
import ResidencyItemInfo from './residency_item_info';

class ResidencyItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showInfo: false };

    this._handleClick = this._handleClick.bind(this);
    this._showInfo = this._showInfo.bind(this);
  }

  _handleClick(e){
    e.stopPropagation();
    this.props.handleClick(this.props.residency);
  }

  _showInfo(e) {
    e.preventDefault();
    this.setState({showInfo: !this.state.showInfo});
  }

  render() {
    let residency = this.props.residency;

    return (
      <li className={`residency-item ${this.props.selected ? 'selected-item' : ''}`} onClick={this._handleClick}>
        <div className='res-container'>
          <div className='res-info'>
            <div className='res-title'>{residency.name}</div>
            <ResidencyItemInfo
              websiteUrl={residency.website_url} description={residency.description} />
          </div>
        </div>
      </li>
    );
  }
}

export default ResidencyItem;
