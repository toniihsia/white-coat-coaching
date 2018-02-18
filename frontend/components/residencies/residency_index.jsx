import React from 'react';
import { Link, browserHistory } from 'react-router-3';
import ResidencyItemContainer from './residency_item_container';
import GoogleMapContainer from '../googlemap/google_map_container';
import {findDOMNode} from 'react-dom';
import {isEqual} from 'lodash';
import {Scrollbars} from 'react-custom-scrollbars';

class ResidencyIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {residencies: [] ,selected: null};

        this.onClickMapEl = this.onClickMapEl.bind(this);
        this._renderThumbVertical = this._renderThumbVertical.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({residencies: nextProps.residencies});
    }

    onClickMapEl(data, setNull){
        let wipeSelected = _.isEqual(this.state.selected, data) || setNull === 'true',
            $residencyItemsContainer = $(findDOMNode(this.residencyItemsContainer));

        if (wipeSelected){
            this.setState({selected: null});
        } else {
            this.setState({selected: data});
        }

        if (wipeSelected) return;

        TweenMax.to($residencyItemsContainer.children(':first'), .3, { // Scrollbars create an inner div that holds scrollable content, must target that.
            scrollTo: `#residencyItem${data.id}`
        });
    }

    _renderThumbVertical() {
        return (<div style={{backgroundColor: "white"}}/>);
    }

    render() {
        let residencies = this.state.residencies;

        return (
            <div className="residency-index">

                <Scrollbars
                    className="residency-item-list-container"
                    style={{width: "50%"}}
                    renderThumbVertical={this._renderThumbVertical}
                    ref={(container) => this.residencyItemsContainer = container}>

                    <ul className="residency-items-list">

                        {residencies.map((residency,i) =>(
                            <ResidencyItemContainer
                                id={`residencyItem${i}`}
                                ref={(item) => this[`residencyItem${i}`] = item}
                                key={`residency-item-${i}`}
                                onClickViewMap={this.onClickMapEl}
                                residency={residency}
                                selected={this.state.selected} />
                        ))}

                    </ul>

                </Scrollbars>

                <GoogleMapContainer
                    residencies={residencies}
                    data={this.state.selected}
                    onClickMarker={this.onClickMapEl} />

            </div>
        );
    }
}

export default ResidencyIndex;
