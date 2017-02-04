import { connect } from 'react-redux';
import { requestAllResidencies } from '../../actions/residency_actions';
import ResidencyIndex from './residency_index';


const mapStateToProps = (state) => {
  return({
  residencies: Object.keys(state.residencies).map(id => state.residencies[id]),
  currentUser: state.session.currentUser
});};

const mapDispatchToProps = (dispatch) => ({
  requestAllResidencies: () => dispatch(requestAllResidencies())
});

export default connect(mapStateToProps,mapDispatchToProps)(ResidencyIndex);
