import React, { Component } from 'react';

import { View, TouchableOpacity } from "react-native";
import { ListItem, Icon, Avatar, ActionButton } from 'react-native-material-ui';
import { withNavigation } from "react-navigation";
import { editPlaylist } from "../redux/commonActions";
import { playlistSet } from "../redux/espActions"
import { connect } from "react-redux";

class PlaylistItem extends Component {
    render() {
        return (
            <ListItem
                divider
                style={{
                    primaryText: {
                        fontSize: 20,
                        fontWeight: "bold"
                    }
                }}
                leftElement={(
                    <View style={{
                        flex: 0,
                        flexDirection: "row",
                        margin: 10
                    }}>
                        <TouchableOpacity onPress={() => this.props.dispatch(playlistSet(this.props.name))}>
                            <Icon name="play-circle-outline" size={30} />
                        </TouchableOpacity>
                    </View>
                )}
                centerElement={{
                    primaryText: this.props.name
                }}
                rightElement={(
                    <View style={{
                        flex: 0,
                        flexDirection: "row",
                        margin: 10
                    }}>
                        <Icon name="delete-forever" size={30} />
                    </View>
                )}
                onPress={() => this.props.dispatch(editPlaylist(this.props.name, this.props.navigation))}
            />
        )
    }
}

export default connect()(withNavigation(PlaylistItem));