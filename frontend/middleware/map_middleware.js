import {getLocation} from '../util/map_api_util';
import {REQUEST_LOCATION, receiveLocation} from '../actions/map_actions'

const MapMiddleware = ({getState, dispatch}) => next => action => {
  const getLocationSuccess = data => {
    dispatch(receiveLocation(data.results[0].geometry.location));
  };

  const getLocationError = error => {
    console.log(error);
  }

  switch (action.type){
    case REQUEST_LOCATION:
      getLocation(action.location, getLocationSuccess, getLocationError);
      return next(action);
    default:
      return next(action);
  }
};

export default MapMiddleware;
