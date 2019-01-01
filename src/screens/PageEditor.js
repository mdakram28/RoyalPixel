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
} from 'react-native';

import { Dialog, DialogDefaultActions } from "react-native-material-ui";
import { connect } from "react-redux";


import FilesList from "../components/FilesList";
import FilesTree from "../components/FilesTree";
import BottomNav from "../components/BottomNav";
import SaveModal from "../components/SaveModal";
import { savePlaylist } from "../service/fs";
import {
    playlistDownload,
    currentPlaylistNameUpdate,
    currentPlaylistAdd,
    currentPlaylistRemove,
    playlistUpload
} from "../redux/espActions";

class PageEditor extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('playlistName', 'Untitled'),
        };
    };


    state = {
        nameDialogVisible: false,
        opened: false
    }

    constructor(props) {
        super(props);
        this.bottomBoxHeight = new Animated.Value(0);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.filesListRef = React.createRef();
    }

    open() {
        Animated.timing(
            this.bottomBoxHeight,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.ease
            }
        ).start(() => { this.setState({ opened: true }); });
    }

    close() {
        Animated.timing(
            this.bottomBoxHeight,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.ease
            }
        ).start(() => { this.setState({ opened: false }); });
    }

    // todo by redux
    savePlaylist() {
        // this.props.navigation.setParams({playlistName: this.state.playlistName});
        // playlistUpload(this.state.playlistName, this.state.files)
        //     .then(() => {
        //         return uploadPlaylist(this.state.playlistName);
        //     }).then(() => {
        //     }).catch(err => {
        //         console.error(err);
        //         ToastAndroid("Failed to save playlist");
        //     });
    }

    render() {
        const { navigation } = this.props;

        const height = this.bottomBoxHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get('window').height * 0.6]
        });

        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <FilesList ref={ref => { this.filesListRef = ref }} opened={this.state.opened} />
                </View>
                <Animated.View style={{
                    height: height,
                    borderTopWidth: 3,
                    borderTopColor: "grey"
                }}>
                    <FilesTree />
                </Animated.View>
                <View>
                    <BottomNav
                        openFileAdder={this.open}
                        closeFileAdder={this.close}
                        selectAll={() => {
                            this.filesListRef.selectAll();
                        }}
                        deselectAll={() => {
                            this.filesListRef.deselectAll();
                        }} export default
                        delete={() => {
                            // console.log(this.filesListRef.);
                            this.filesListRef.removeSelected();
                        }}
                        opened={this.state.opened}
                        upload={() => {
                            savePlaylist(this.props.playlistName, this.props.playlist)
                            .then(()=> {
                                this.props.playlistUpload();
                            })
                        }}
                    />
                </View>
                <SaveModal
                    close={() => this.setState({ nameDialogVisible: false })}
                    playlistName={this.state.playlistName}
                    visible={this.state.nameDialogVisible}
                    onChange={(playlistName) => {
                        this.setState({ playlistName });
                        this.props.navigation.setParam({ playlistName });
                    }}
                    onSave={this.savePlaylist}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        playlist: state.esp.currentPlaylist,
        playlistName: state.esp.currentPlaylistName
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playlistDownload: (playlistName) => dispatch(playlistDownload(playlistName)),
        currentPlaylistNameUpdate: () => dispatch(currentPlaylistNameUpdate()),
        currentPlaylistAdd: (file) => dispatch(currentPlaylistAdd(file)),
        currentPlaylistRemove: (from, to) => dispatch(currentPlaylistRemove(from, to)),
        playlistUpload: () => dispatch(playlistUpload())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageEditor);
