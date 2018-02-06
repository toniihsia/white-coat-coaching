import { fetchAllResidencies, createResidency, updateResidency, deleteResidency, deleteResidencies } from '../util/residency_api_util';
import { REQUEST_ALL_RESIDENCIES, CREATE_RESIDENCY, UPDATE_RESIDENCY, DELETE_RESIDENCY, DELETE_RESIDENCIES,
receiveAllResidencies, receiveErrors, receiveResidency } from '../actions/residency_actions';
import { hashHistory } from 'react-router-3';

const ResidencyMiddleware = ({getState, dispatch}) => next => action => {
  const fetchResidenciesSuccess = data => dispatch(receiveAllResidencies(data));
  const createResidencySuccess = data => dispatch(receiveResidency(data));
  const errorLog = errors => dispatch(receiveResidency(errors.responseJSON));
  const deleteResidenciesSuccess = (data) => {
    dispatch(receiveAllResidencies(data));
    hashHistory.push("/");
  };

  switch (action.type){
    case REQUEST_ALL_RESIDENCIES:
      fetchAllResidencies(fetchResidenciesSuccess);
      return next(action);
    case CREATE_RESIDENCY:
      createResidency(action.residency, action.session_token, deleteResidenciesSuccess, errorLog);
      return next(action);
    case UPDATE_RESIDENCY:
      updateResidency(action.residency, createResidencySuccess, errorLog);
      return next(action);
    case DELETE_RESIDENCY:
      deleteResidency(action.id, fetchResidenciesSuccess, errorLog);
      return next(action);
    case DELETE_RESIDENCIES:
      deleteResidencies(action.ids, action.session_token, deleteResidenciesSuccess, errorLog);
      return next(action);
    default:
      return next(action);
  }
};

export default ResidencyMiddleware;
