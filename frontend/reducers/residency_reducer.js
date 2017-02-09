import merge from 'lodash/merge';
import { RECEIVE_ALL_RESIDENCIES, RECEIVE_ERRORS, RECEIVE_RESIDENCY } from '../actions/residency_actions';

const ResidencyReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);

  switch(action.type) {
    case RECEIVE_ALL_RESIDENCIES:
      return action.residencies;
    case RECEIVE_RESIDENCY:
      let residencyId = parseInt(Ojbect.keys(action.post)[0]);
      newState[residencyId] = merge({}, _defaultResidency, action.post[residencyId]);
      return newState;
    default:
      return oldState;
  }
};

export default ResidencyReducer;
