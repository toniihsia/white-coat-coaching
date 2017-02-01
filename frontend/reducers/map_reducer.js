import merge from 'lodash/merge';
import { RECEIVE_LOCATION } from '../actions/map_actions';

const _nullLocation = Object.freeze({
  location: {},
});

const MapReducer = (oldState = _nullLocation, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);

  switch(action.type) {
    case RECEIVE_LOCATION:
      return merge({}, action.location);
    default:
      return oldState;
  }
};

export default MapReducer;
