import merge from 'lodash/merge';
import { RECEIVE_ALL_RESIDENCIES } from '../actions/residency_actions';

const ResidencyReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);

  switch(action.type) {
    case RECEIVE_ALL_RESIDENCIES:
      return action.residencies;
    default:
      return oldState;
  }
};

export default ResidencyReducer;
