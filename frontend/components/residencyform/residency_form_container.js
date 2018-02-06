import { connect } from 'react-redux';
import ResidencyForm from './residency_form';
import { createResidency, updateResidency, requestAllResidencies, deleteResidencies } from '../../actions/residency_actions';

const mapStateToProps = (state) => {
  return{
    residencies: Object.keys(state.residencies).map(id => state.residencies[id]),
    currentUser: state.session.currentUser
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createResidency: (residency, session_token) => dispatch(createResidency(residency, session_token)),
    updateResidency: (residency) => dispatch(updateResidency(residency)),
    deleteResidencies: (ids, session_token) => dispatch(deleteResidencies(ids, session_token)),
    requestAllResidencies: () => dispatch(requestAllResidencies())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResidencyForm);
