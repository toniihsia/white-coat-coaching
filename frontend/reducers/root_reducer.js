import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ResidencyReducer from './residency_reducer';
import ErrorReducer from './error_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  residencies: ResidencyReducer,
  errors: ErrorReducer
});

export default rootReducer;
