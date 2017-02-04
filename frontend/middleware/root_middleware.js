import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import ResidencyMiddleware from './residency_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  ResidencyMiddleware
);

export default RootMiddleware;
