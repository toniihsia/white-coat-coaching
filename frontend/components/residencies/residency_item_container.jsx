import { connect } from 'react-redux';
import { updateResidency, deleteResidency } from '../../actions/residency_actions';
import ResidencyItem from './residency_item';


const mapStateToProps = (state, ownProps) => ({
  residency: ownProps.residency
});

const mapDispatchToProps = (dispatch) =>{

  return {
    updateResidency: (residency) => dispatch(updateResidency(residency)),
    deleteResidency: (id) => dispatch(deleteResidency(id))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ResidencyItem);
