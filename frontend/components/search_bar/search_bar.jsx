import React from 'react';
import SearchInput, { createFilter } from 'react-search-input';
import ResidencyIndexContainer from '../residencies/residency_index';

const KEYS_TO_FILTERS = [
  'name',
  'PD',
  'address.city',
  'address.state',
  'PD',
  'coordinator.name',
  'curriculum',
  'med_student_coordinator.name',
  'med_student_coordinator.email',
  'merger_status',
  'rotation.booking_medium',
  'rotation.schedule_restrictions'
];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this._handleSearchChange = this._handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.props.requestAllResidencies();
  }


  _handleSearchChange(term) {
    this.setState( { search: term });
  }

  render() {
    let residencies = this.props.residencies;
    console.log(residencies);
    let filteredResidencies = residencies.filter(createFilter(this.state.search, KEYS_TO_FILTERS));


    if (filteredResidencies.length === 0) {
      return (
        <div className="error">
          <SearchInput
            className="search-input"
            onChange={this._handleSearchChange} />
          <h1>No residencies match your search!</h1>
        </div>
      );
    } else {
      return (
        <div>
          <SearchInput
            className="search-input"
            onChange={this._handleSearchChange} />
          <ResidencyIndexContainer
              residencies={filteredResidencies}
          />
        </div>
      );
    }
  }
}

export default SearchBar;

// input field for search
// if input field for search bar is empty
  // pass in all of the residencies
// onchange of input field
  // filter by the input field
  // update residencies
  // pass residencies to index
//   render () {
//     const filteredResidneices = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
//
//     return (
//       <div>
//         <SearchInput className="search-input" onChange={this.searchUpdated} />
//         {filteredEmails.map(email => {
//           return (
//             <div className="mail" key={email.id}>
//               <div className="from">{email.user.name}</div>
//               <div className="subject">{email.subject}</div>
//             </div>
//           )
//         })}
//       </div>
//     )
//   },
//
//   searchUpdated (term) {
//     this.setState({searchTerm: term})
//   }
// })
