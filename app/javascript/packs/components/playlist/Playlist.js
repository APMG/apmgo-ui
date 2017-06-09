import * as React from 'react';
import { connect } from 'react-redux';
import PlaylistItem from './PlaylistItem';
import List from 'material-ui/List';
class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.data) {
            return React.createElement("h1", null, "Loading ...");
        }
        return (React.createElement(List, null, this.props.data.map(item => React.createElement(PlaylistItem, { item: item }))));
    }
}
const mapStateToProps = (state) => {
    let playlistItems = state.data;
    return { data: playlistItems };
};
const PlaylistContainer = connect(mapStateToProps)(Playlist);
export default PlaylistContainer;
