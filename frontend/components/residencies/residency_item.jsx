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

        this.focusedOnMap = false;

        this.onClickViewMap = this.onClickViewMap.bind(this);
        this.onClickNavTitle = this.onClickNavTitle.bind(this);
        this.updateNavTrack = this.updateNavTrack.bind(this);
    }

    componentDidMount() {
        this.onClickNavTitle();
    }

    componentDidUpdate() {
        let isSelected = this.props.selected && this.props.selected.id === this.props.residency.id;

        $(this.mapBtn)
            .toggleClass('is-outlined', !isSelected)
            .text(isSelected ? 'Zoom Out' : 'View on Map');
    }

    onClickViewMap(e){
        e.stopPropagation();

        this.props.onClickViewMap(this.props.residency);
    }

    onClickNavTitle(ev) {
        let $old = $(this.itemNav).find('.is-active'),
            $new = ev && $(ev.currentTarget);

        if (!$new) {
            $new = $old;
        }

        this.$activeTab = $new;

        TweenMax.to(this.itemContent, .3, {
            onStart: () => {
                $old.removeClass('is-active');
                $new.addClass('is-active');
                this.updateNavTrack();
            },
            right: `${CONTENT_SLIDE_ORDER.indexOf($new.data('key')) * 100}%`
        });
    }

    updateNavTrack(ev) {
        let $el = ev && ev.type === 'mouseenter' ? $(ev.currentTarget) : this.$activeTab;

        TweenMax.to(this.navHighlight, .3, {
            width: `${$el.width()}px`,
            left: `${$el.offset().left - 30 - 200}px` // 25px account for padding.
        });
    }

    render() {
        let residency = this.props.residency;

        return (
            <li
                id={`residencyItem${residency.id}`}
                className={`residency-item ${this.props.selected ? 'selected-item' : ''}`}>

                <div className="residency-item-list">

                    <div className="residency-item-header">

                        <h3 className="header-title" ref={(title) => this.title = title}>{residency.name}</h3>

                        <button ref={(btn) => this.mapBtn = btn} className="btn-red is-outlined" onClick={this.onClickViewMap}>
                            <label>View on Map</label>
                        </button>

                    </div>

                    <div className="residency-item-nav" ref={(nav) => this.itemNav = nav} onMouseLeave={this.updateNavTrack}>

                        <label className="nav-title is-active" data-key="program" onClick={this.onClickNavTitle} onMouseEnter={this.updateNavTrack}>Program</label>
                        <label className="nav-title" data-key="rotation" onClick={this.onClickNavTitle} onMouseEnter={this.updateNavTrack}>Rotation</label>
                        <label className="nav-title" data-key="application" onClick={this.onClickNavTitle} onMouseEnter={this.updateNavTrack}>Application</label>
                        <label className="nav-title" data-key="contact" onClick={this.onClickNavTitle} onMouseEnter={this.updateNavTrack}>Contact Info</label>

                        <div className="nav-track" ref={(navTrack) => this.navTrack = navTrack}>
                            <div className="nav-track-highlight" ref={(navHighlight) => this.navHighlight = navHighlight}></div>
                        </div>

                    </div>


                    <div className="residency-item-content" ref={(content) => this.itemContent = content}>

                        <div className="residency-item-content-slide is-active" data-key="program">

                            <div className="content-slide-program">

                                <div className="slide-info-url">
                                    <label><strong>Website: </strong><a href={residency.website_url}>{residency.website_url}</a></label>
                                </div>

                                <div className="slide-info">
                                    <label><strong>Address: </strong></label>
                                    <span>{residency.address.street}</span><br/>
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
