import { fetchAllResidencies, createResidency, updateResidency, deleteResidency } from '../util/residency_api_util';
import { REQUEST_ALL_RESIDENCIES, CREATE_RESIDENCY, UPDATE_RESIDENCY, DELETE_RESIDENCY,
receiveAllResidencies, receiveErrors, receiveResidency } from '../actions/residency_actions'

const ResidencyMiddleware = ({getState, dispatch}) => next => action => {
  const fetchResidenciesSuccess = data => dispatch(receiveAllResidencies(data));
  const createResidencySuccess = data => dispatch(receiveResidency(data));
  const errorLog = errors => dispatch(receiveResidency(errors.responseJSON));

  switch (action.type){
    case REQUEST_ALL_RESIDENCIES:
      fetchAllResidencies(fetchResidenciesSuccess);
      return next(action);
    case CREATE_RESIDENCY:
      createResidency(action.residency, createResidencySuccess, errorLog);
      return next(action);
    case UPDATE_RESIDENCY:
      updateResidency(action.residency, createResidencySuccess, errorLog);
      return next(action);
    case DELETE_RESIDENCY:
      deleteResidency(action.id, fetchResidenciesSuccess, errorLog);
      return next(action);
    default:
      return next(action);
  }
};

export default ResidencyMiddleware;
