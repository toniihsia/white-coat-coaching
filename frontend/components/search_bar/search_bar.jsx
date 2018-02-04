import React from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ResidencyIndexContainer from '../residencies/residency_index';

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
        'requiredRotation'
    ];

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            residencies: [],
            search: '',
            stateFilter: '',
            residentsPerYearFilter: undefined,
            mergerStatusFilter: [],
            rotatingStudentsFilter: [],
            requiredRotationFilter: undefined,
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.renderFilterSelector = this.renderFilterSelector.bind(this);
        this._getFilterSelectorPlaceholder = this._getFilterSelectorPlaceholder.bind(this);
        this._getFilterSelectorOptions = this._getFilterSelectorOptions.bind(this);
        this.onClickFilter = this.onClickFilter.bind(this);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.filterResidencies = this.filterResidencies.bind(this);
    }

    componentDidMount() {
        this.props.requestAllResidencies();
    }

    componentWillReceiveProps(nextProps){
        this.setState({residencies: nextProps.residencies});
    }

    onSearchChange(term) {
        this.setState({search: term});
    }

    renderFilterSelector(filterType,i) {
        let options = this._getFilterSelectorOptions(filterType),
            multi = filterType === 'mergerStatus' || filterType === 'rotatingStudents',
            stateAttribute = `${filterType}Filter`,
            className = `additional-filter filter-${filterType.toLowerCase()}`,
            selectName = `filter-selector-${filterType.toLowerCase()}`,
            placeholder = this._getFilterSelectorPlaceholder(filterType);

        return (
            <div
                key={i}
                className={className}
                onClick={this.onClickFilter.bind(this, filterType)}>

                <Select
                    name={selectName}
                    multi={multi}
                    joinValues={multi}
                    placeholder={placeholder}
                    value={this.state[stateAttribute]}
                    options={options}
                    onChange={this.onChangeFilter}
                    />
            </div>
        );
    }

    _getFilterSelectorPlaceholder(filterType) {
        let placeholder;

        switch(filterType) {
            case 'state':
                placeholder = 'Select a state...';
            break;
            case 'residentsPerYear':
                placeholder = 'Residents per year...';
            break;
            case 'mergerStatus':
                placeholder = 'ACGME merger status...';
            break;
            case 'rotatingStudents':
                placeholder = '# of rotating students...';
            break;
            case 'requiredRotation':
                placeholder = 'Rotation required...'
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
                options=[{
                    value: `${filterType}:required`,
                    label: 'Required'
                }, {
                    value: `${filterType}:unrequired`,
                    label: 'Unrequired'
                }];
            break;
            default:
                throw new Error(`Getting options: The filter type ${filterType} does not exist yet.`)
        }

        return options;
    }

    onChangeFilter(selectedOption) {
        let filterType,
            isMultiSelect = selectedOption && selectedOption instanceof Array;

        if (!selectedOption || (isMultiSelect && !selectedOption.length)) {
            filterType = this.clickedFilter;
        } else {
            filterType = isMultiSelect ? selectedOption[0].value.split(':')[0] : selectedOption.value.split(':')[0];
        }

        switch (filterType){
            case 'state':
                this.setState({
                    stateFilter: selectedOption
                });
            break;
            case 'residentsPerYear':
                this.setState({
                    residentsPerYearFilter: selectedOption
                });
            break;
            case 'mergerStatus':
                this.setState({
                    mergerStatusFilter: selectedOption
                });
            break;
            case 'rotatingStudents':
                this.setState({
                    rotatingStudentsFilter: selectedOption
                });
            break;
            case 'requiredRotation':
            this.setState({
                requiredRotationFilter: selectedOption
            });
            break;
            default:
                throw new Error('That filter type does not exist yet. Please check your filter type.')
        }
    }

    onClickFilter(filterType) {
        this.clickedFilter = filterType;
    }

    filterResidencies() {
        let stateFilter = this.state.stateFilter && this.state.stateFilter.label,
            mergerStatusFilter = this.state.mergerStatusFilter.length && this.state.mergerStatusFilter.map((option) => option.label.toLowerCase()),
            residentsPerYearFilter = this.state.residentsPerYearFilter && this.state.residentsPerYearFilter.label,
            rotatingStudentsFilter = this.state.rotatingStudentsFilter.length && this.state.rotatingStudentsFilter.map((option) => option.label),
            requiredRotationFilter = this.state.requiredRotationFilter && this.state.requiredRotationFilter.label.toLowerCase(),
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

    render() {
        let filteredResidencies = this.filterResidencies();

        return (
            <div>
                <SearchInput
                    className="search-input"
                    onChange={this.onSearchChange}
                    />

                <div className="additional-filters-container">
                    {FILTER_TYPES.map((filterType, i) => this.renderFilterSelector(filterType,i))}
                </div>

                <ResidencyIndexContainer
                    residencies={filteredResidencies}
                    />
            </div>
        );
    }
}

export default SearchBar;
