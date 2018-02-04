import React from 'react';
import { Link, hashHistory } from 'react-router-3';
import ResidencyItemInfo from './residency_item_info';

const CONTENT_SLIDE_ORDER = [
    'program',
    'rotation',
    'application',
    'contact'
];
class ResidencyItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showInfo: false };

        this._handleClick = this._handleClick.bind(this);
        this._showInfo = this._showInfo.bind(this);
        this.onClickNavTitle = this.onClickNavTitle.bind(this);
    }

    _handleClick(e){
        e.stopPropagation();
        this.props.handleClick(this.props.residency);
    }

    _showInfo(e) {
        e.preventDefault();
        this.setState({showInfo: !this.state.showInfo});
    }

    onClickNavTitle(ev) {
        let $old = $(this.itemNav).find('.is-active'),
            $new = $(ev.currentTarget);

        TweenMax.to(this.itemContent, .3, {
            onStart: () => {
                $old.removeClass('is-active');
                $new.addClass('is-active');
            },
            right: `${CONTENT_SLIDE_ORDER.indexOf($new.data('key')) * 100}%`
        });
    }

    render() {
        let residency = this.props.residency;
        console.log(residency);
        return (
            <li
                className={`residency-item ${this.props.selected ? 'selected-item' : ''}`}>

                <div className="residency-item-list">

                    <div className="residency-item-header">
                        <h3 className="header-title">{residency.name}</h3>
                        <a className="header-url" href={residency.website_url}>[Website]</a>
                    </div>

                    <div className="residency-item-nav" ref={(nav) => this.itemNav = nav}>
                        <label className="nav-title is-active" data-key="program" onClick={this.onClickNavTitle}>Program</label>
                        <label className="nav-title" data-key="rotation" onClick={this.onClickNavTitle}>Rotation</label>
                        <label className="nav-title" data-key="application" onClick={this.onClickNavTitle}>Application</label>
                        <label className="nav-title" data-key="contact" onClick={this.onClickNavTitle}>Contact Info</label>
                    </div>


                    <div className="residency-item-content" ref={(content) => this.itemContent = content}>

                        <div className="residency-item-content-slide is-active" data-key="program">

                            <div className="slide-program">

                                <div className="slide-info">
                                    <label><strong>Name: </strong>{residency.name}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Website: </strong>{residency.website_url}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Address: </strong></label>
                                    <span>{residency.address.street}</span>
                                    <span>{residency.address.city}</span>, <span>{residency.address.state}</span> <span>{residency.address.zip_code}</span>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Program director: </strong>{residency.program_director}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Residents per year: </strong>{residency.num_residents}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>ACGME merger status: </strong>{residency.merger_status}</label>
                                </div>

                                {residency.description &&

                                    <div className="slide-info">
                                        <label><strong>Description: </strong>{residency.description}</label>
                                    </div>

                                }

                            </div>

                        </div>

                        <div className="residency-item-content-slide" data-key="rotation">

                            <div className="content-slide-rotation">

                                <div className="slide-info">
                                    <label><strong># of residents/year: </strong>{residency.num_rotating_students}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Student coordinator: </strong>{residency.med_student_coordinator.name}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Student coordinator email: </strong>{residency.med_student_coordinator.email}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Student coordinator phone: </strong>{residency.med_student_coordinator.phone_number}</label>
                                </div>

                            </div>

                        </div>

                        <div className="residency-item-content-slide" data-key="application">

                            <div className="content-slide-application">

                                <div className="slide-info">
                                    <label><strong>Previous interview date: </strong>{residency.interview_date}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Previous # of interviewed: </strong>{residency.interview_count}</label>
                                </div>

                            </div>

                        </div>

                        <div className="residency-item-content-slide" data-key="contact">

                            <div className="content-slide-contact">

                                <div className="slide-info">
                                    <label><strong>Program coordinator: </strong>{residency.coordinator.name}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Program coordinator email: </strong>{residency.coordinator.email}</label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Program coordinator phone: </strong>{residency.coordinator.phone_number}</label>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </li>
        );
    }
}

export default ResidencyItem;
