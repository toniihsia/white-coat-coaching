import { connect } from 'react-redux';
import { requestAllResidencies } from '../../actions/residency_actions';
import ResidencyIndex from './residency_index';


const mapStateToProps = (state) => {
  return({
  residencies: state.residencies
});};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(ResidencyIndex);
