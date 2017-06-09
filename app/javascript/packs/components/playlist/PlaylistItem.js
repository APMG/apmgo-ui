import * as React from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import Done from 'material-ui/svg-icons/action/done';
import { grey400, red50, red700 } from 'material-ui/styles/colors';
const iconButtonElement = (React.createElement(IconButton, { touch: true, tooltip: "more", tooltipPosition: "bottom-left" },
    React.createElement(MoreVertIcon, { color: grey400 })));
const rightIconMenu = (React.createElement(IconMenu, { iconButtonElement: iconButtonElement },
    React.createElement(MenuItem, { leftIcon: React.createElement(Done, null) }, "Mark as played"),
    React.createElement(MenuItem, { leftIcon: React.createElement(Delete, null) }, "Delete")));
const PlaylistItem = (props) => (React.createElement(ListItem, { leftAvatar: React.createElement(Avatar, { color: red50, backgroundColor: red700 }, "TC"), rightIconButton: rightIconMenu, primaryText: props.item.attributes['audio-title'], secondaryText: React.createElement("p", null, props.item.attributes['audio-description']), secondaryTextLines: 1 }));
export default PlaylistItem;
