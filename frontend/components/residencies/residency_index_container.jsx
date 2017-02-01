import { connect } from 'react-redux';
import { fetchAllResidencies } from '../../actions/song_actions';
import SongIndex from './song_index';
import { selectAllSongs } from '../../reducers/selector';


const mapStateToProps = (state) => {
  return({
  songs: selectAllSongs(state.songs.songs)
});};

const mapDispatchToProps = (dispatch) => ({
    fetchAllSongs: () => dispatch(fetchAllSongs())
});

export default connect(mapStateToProps,mapDispatchToProps)(SongIndex);
