import React from 'react';
import { Link, hashHistory } from 'react-router';
import { getLocation } from '../../util/map_api_util';

class ResidencyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      residencies: []
    };

    this.uploadCSV = this.uploadCSV.bind(this);
  }

  componentDidMount(){
    this.props.requestAllResidencies();
  }

  handleClick(e){
    e.stopPropagation();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, results) {
  }

  parseThroughCSV(doc){
    let residencyArr = [];

    this.setState({residencies: residencyArr})
  }

  render() {
    return (
      <div className="residency-form">
        <button onClick={this.handleClick}>Upload from CSV</button> or enter info manually
      </div>
    );
  }
}

export default ResidencyIndex;
