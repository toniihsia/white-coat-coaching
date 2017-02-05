import { connect } from 'react-redux';
import GoogleMap from './google_map';

const mapStateToProps = (state) => ({
  residencies: Object.keys(state.residencies).map(id => state.residencies[id])
});

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
