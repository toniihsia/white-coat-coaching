import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ResidencyReducer from './residency_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  residencies: ResidencyReducer
});

export default rootReducer;
