import React from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import Select from 'react-select';
import ResidencyIndexContainer from '../residencies/residency_index';
import {isNaN, flatten} from 'lodash';
import 'react-select/dist/react-select.css';

const KEYS_TO_FILTERS = [
        'name',
        'program_director',
        'coordinator.name',
        'med_student_coordinator.name',
        'med_student_coordinator.email',
        'application_instructions'
    ],
    FILTER_TYPES = [
        'state',
        'residentsPerYear',
        'mergerStatus',
        'rotatingStudents',
        'requiredRotation',
        'comlexRequirement',
        'usmleRequirement'
    ];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            residencies: [],
            search: '',
            state: '',
            residentsPerYear: undefined,
            mergerStatus: [],
            rotatingStudents: [],
            requiredRotation: undefined,
            comlexRequirement: [],
            usmleRequirement: []
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.renderFilterSelector = this.renderFilterSelector.bind(this);
        this._getFilterSelectorPlaceholder = this._getFilterSelectorPlaceholder.bind(this);
        this._getFilterSelectorOptions = this._getFilterSelectorOptions.bind(this);
        this._cleanStringRanges = this._cleanStringRanges.bind(this);
        this._withinRange = this._withinRange.bind(this);
        this._setStateFilter = this._setStateFilter.bind(this);
        this.filterResidencies = this.filterResidencies.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({residencies: nextProps.residencies});
    }

    onSearchChange(term) {
        this.setState({search: term});
    }

    renderFilterSelector(filterType, i) {
        let options = this._getFilterSelectorOptions(filterType),
            multi = filterType === 'mergerStatus' || filterType === 'rotatingStudents' || filterType === 'comlexRequirement' || filterType === 'usmleRequirement',
            className = `additional-filter filter-${filterType.toLowerCase()}`,
            selectName = `filter-selector-${filterType}`,
            placeholder = this._getFilterSelectorPlaceholder(filterType);

        return (
            <div
                key={i}
                className={className}>

                <Select
                    name={selectName}
                    multi={multi}
                    joinValues={multi}
                    placeholder={placeholder}
                    value={this.state[filterType]}
                    options={options}
                    onChange={this.onChangeFilter}
                    setStateFilter={this._setStateFilter}
                    />
            </div>
        );
    }

    _getFilterSelectorPlaceholder(filterType) {
        let placeholder;

        switch(filterType) {
            case 'state':
                placeholder = 'State';
            break;
            case 'residentsPerYear':
                placeholder = 'Class size';
            break;
            case 'mergerStatus':
                placeholder = 'ACGME';
            break;
            case 'rotatingStudents':
                placeholder = 'Students';
            break;
            case 'requiredRotation':
                placeholder = 'Rotation'
            break;
            case 'comlexRequirement':
                placeholder = 'COMLEX';
            break;
            case 'usmleRequirement':
                placeholder = 'USMLE';
            break;
            default:
                throw new Error(`Fetching placeholder: The filter type ${filterType} does not exist.`);
        }

        return placeholder;
    }

    _getFilterSelectorOptions(filterType) {
        let options;

        switch (filterType) {
            case 'state':
                let availableStates = {};

                options = [];

                this.state.residencies.forEach((residency) => {
                    let stateName = `${residency.state}`;

                    if (availableStates[stateName]) return;
                    availableStates[stateName] = true;
                });

                Object.keys(availableStates).sort().forEach((stateName) => {
                    options.push({
                        value: `${filterType}:${stateName}`,
                        label: stateName
                    });
                });
            break;
            case 'residentsPerYear':
                options = [{
                    value: `${filterType}:<4`,
                    label: '3 or less'
                }, {
                    value: `${filterType}:4+`,
                    label: '4 or more'
                }];
            break;
            case 'mergerStatus':
                options = [{
                    value: `${filterType}:preAccreditation`,
                    label: 'Pre-accreditation'
                }, {
                    value: `${filterType}:continuedPreAccreditation`,
                    label: 'Continued pre-accreditation'
                }, {
                    value: `${filterType}:initialAccreditation`,
                    label: 'Initial accreditation'
                }];
            break;
            case 'rotatingStudents':
                options = [{
                    value: `${filterType}:<15`,
                    label: '1-14'
                }, {
                    value: `${filterType}:<30`,
                    label: '15-29'
                }, {
                    value: `${filterType}:30+`,
                    label: '30+'
                }];
            break;
            case 'requiredRotation':
                options = [{
                    value: `${filterType}:required`,
                    label: 'Required'
                }, {
                    value: `${filterType}:unrequired`,
                    label: 'Unrequired'
                }];
            break;
            case 'comlexRequirement':
                options = [{
                    value: `${filterType}:0`,
                    label: 'No requirements'
                }, {
                    value: `${filterType}:550-574`,
                    label: '550-574'
                }, {
                    value: `${filterType}:575-599`,
                    label: '575-599'
                }, {
                    value: `${filterType}:600+`,
                    label: '600+'
                }];
            break;
            case 'usmleRequirement':
                options = [{
                    value: `${filterType}:0`,
                    label: 'No requirements'
                }, {
                    value: `${filterType}:230-244`,
                    label: '230-244'
                }, {
                    value: `${filterType}:245+`,
                    label: '245+'
                }];
            break;
            default:
                throw new Error(`Getting options: The filter type ${filterType} does not exist yet.`)
        }

        return options;
    }

    onChangeFilter(selectedOption) {
        let filterType = this.name.replace('filter-selector-', ''),
            stateObject = {},
            isMultiSelect = selectedOption && selectedOption instanceof Array;

        if (!FILTER_TYPES.includes(filterType)) {
            throw new Error(`On filter change: The filter type ${filterType} does not exist yet.`)
        }

        stateObject[`${filterType}`] = selectedOption;
        this.setStateFilter(stateObject);
    }

    _setStateFilter(stateObject) {
        this.setState(stateObject);
    }

    _cleanStringRanges(str) {
        if (str === 'No requirements') {
            return [0];
        }

        let cleanedRange = str.split('-');
        cleanedRange[0] = parseInt(cleanedRange[0]);
        if (cleanedRange[1]) {
            cleanedRange[1] = parseInt(cleanedRange[1].replace('+', ''));
        }

        return cleanedRange;
    }

    filterResidencies() {
        let stateFilter = this.state.state && this.state.state.label,
            mergerStatusFilter = this.state.mergerStatus.length && this.state.mergerStatus.map((option) => option.label.toLowerCase()),
            residentsPerYearFilter = this.state.residentsPerYear && this.state.residentsPerYear.label,
            rotatingStudentsFilter = this.state.rotatingStudents.length && this.state.rotatingStudents.map((option) => option.label),
            requiredRotationFilter = this.state.requiredRotation && this.state.requiredRotation.label.toLowerCase(),
            comlexRequirementFilter = this.state.comlexRequirement.length && this.state.comlexRequirement.map((option) => this._cleanStringRanges(option.label)),
            usmleRequirementFilter = this.state.usmleRequirement.length && this.state.usmleRequirement.map((option) => this._cleanStringRanges(option.label)),
            generalSearchTerm = this.state.search;

        return this.state.residencies.filter((residency) => {
            // State filter.
            if (stateFilter && (stateFilter !== residency.state)) return false;

            // Merger status filter.
            if (mergerStatusFilter && (!mergerStatusFilter.includes(residency.merger_status.toLowerCase()))) return false;

            // # residents per year filter.
            if (residentsPerYearFilter === '3 or less' && residency.num_residents > 3) return false;
            if (residentsPerYearFilter === '4 or more' && residency.num_residents < 4) return false;

            // # rotating students filter.
            if (rotatingStudentsFilter && (!rotatingStudentsFilter.includes(residency.num_rotating_students))) return false;

            // Rotation required filter.
            if (requiredRotationFilter && requiredRotationFilter === 'unrequired' && residency.rotation_required) return false;
            if (requiredRotationFilter && requiredRotationFilter === 'required' && !residency.rotation_required) return false;

            // COMLEX requirements filter.
            if (comlexRequirementFilter && !this._withinRange(residency.comlex_requirement, comlexRequirementFilter)) return false;

            // USMLE requirements filter.
            if (usmleRequirementFilter && !this._withinRange(residency.usmle_requirement, usmleRequirementFilter)) return false;

            // General search.
            let passesFilter = !generalSearchTerm;
            if (generalSearchTerm) {
                for (let i = 0; i < KEYS_TO_FILTERS.length; i++) {
                    let resValue = _.get(residency, KEYS_TO_FILTERS[i]).toLowerCase();

                    if (resValue.includes(generalSearchTerm.toLowerCase())) {
                        passesFilter = true;
                        break;
                    }
                }
            }
            if (!passesFilter) return false;

            return true;
        });
    }

    _withinRange(resStat, stats) {
        let maxStat = Math.max(..._.flatten(stats)),
            minStat = Math.min(..._.flatten(stats));

        resStat = parseInt(resStat);

        if (_.isNaN(resStat)) {
            resStat = 0;
        }

        return resStat <= maxStat && resStat >= minStat;
    }

    render() {
        let filteredResidencies = this.filterResidencies();

        return (
            <div className="global-content">
                <SearchInput
                    className="search-input"
                    onChange={this.onSearchChange}
                    />

                <div className="additional-filters-container">
                    {FILTER_TYPES.map((filterType, i) => this.renderFilterSelector(filterType, i))}
                </div>

                <ResidencyIndexContainer
                    residencies={filteredResidencies}
                    />
            </div>
        );
    }
}

export default SearchBar;
