import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    Dimensions,
    ToastAndroid,
    TextInput,
    Modal,
    ScrollView,
    BackHandler,
    Button
} from 'react-native';
import { connect } from "react-redux";

import { ListItem, Icon, Avatar, ActionButton } from 'react-native-material-ui';
import PlaylistItem from "../components/PlaylistItem";

import { playlistsRefresh } from "../redux/espActions";
import { newPlaylist } from '../redux/commonActions';
import { withNavigation } from "react-navigation"
import { TouchableOpacity } from 'react-native';

class PagePlaylist extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Playlists',
        headerLeft: (
            <TouchableOpacity style={{marginLeft: 15}} size={20} onPress={()=> navigation.openDrawer()}>
                <Icon name="menu"/>
            </TouchableOpacity>
        )
    })

    state = {
    }

    componentDidMount() {
        this.props.playlistsRefresh();
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                {this.props.playlists.map(playlist => {
                    var name = playlist.substring(playlist.lastIndexOf("/") + 1);
                    name = playlist.substring(0, playlist.lastIndexOf("."));
                    return (
                        <PlaylistItem playlist={playlist} name={name} />
                    )
                })}
                <Button onPress={()=> {
                    this.props.newPlaylist(this.props.navigation);
                }} title="CREATE NEW PLAYLIST"/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.esp.playlists
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playlistsRefresh: () => dispatch(playlistsRefresh()),
        newPlaylist : (navigation) => dispatch(newPlaylist(navigation)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PagePlaylist));
