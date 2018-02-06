import { connect } from 'react-redux';
import { logIn, logOut, signUp } from '../../actions/session_actions';
import SessionForm from './session_form';


const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
  errors: session.errors
});

const mapDispatchToProps = (dispatch) => {

  return {
    logIn: user => dispatch(logIn(user)),
    signUp: user => dispatch(signUp(user))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SessionForm);
