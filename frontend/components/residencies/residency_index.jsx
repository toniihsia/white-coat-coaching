import React from 'react';
import { Link, hashHistory } from 'react-router-3';
import ResidencyItemContainer from './residency_item_container';
import GoogleMapContainer from '../googlemap/google_map_container';
import { isEqual } from 'lodash';

class ResidencyIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {residencies: [] ,selected: null};

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({residencies: nextProps.residencies});
    }

    handleClick(data, setNull){
        if (_.isEqual(this.state.selected, data) || setNull === 'true'){
            this.setState({selected: null});
        } else {
            this.setState({selected: data});
        }
    }

    render() {
        let residencies = this.state.residencies;

        return (
            <div className="residency-index">

                <ul className="residency-item-container">

                    {residencies.map((residency,i) =>(
                        <ResidencyItemContainer
                            key={i}
                            handleClick={this.handleClick}
                            residency={residency}
                            selected={this.state.selected} />
                    ))}

                </ul>

                <GoogleMapContainer
                    data={this.state.selected}
                    handleClick={this.handleClick} />

            </div>
        );
    }
}

export default ResidencyIndex;
