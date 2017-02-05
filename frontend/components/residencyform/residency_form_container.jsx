import { connect } from 'react-redux';
import ResidencyForm from './residency_form';
import { createResidency, updateResidency, requestAllResidencies } from '../../actions/residency_actions';

const mapStateToProps = (state) => ({
  residencies: Object.keys(state.residencies).map(id => state.residencies[id])
});

const mapDispatchToProps = dispatch => {
  return {
    createResidency: (residency) => dispatch(createResidency(residency)),
    updateResidency: (residency) => dispatch(updateResidency(residency)),
    requestAllResidencies: () => dispatch(requestAllResidencies())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResidencyForm);
