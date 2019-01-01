import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Dimensions, ToastAndroid } from 'react-native';

import { BottomNavigation } from 'react-native-material-ui';

export default class BottomNav extends Component {
    render() {
        if (this.props.opened) {
            return (
                <BottomNavigation hidden={false} >
                    <BottomNavigation.Action
                        key="playlistAddCheck"
                        icon="playlist-add-check"
                        label="Done"
                        onPress={() => this.props.closeFileAdder()}
                    />
                </BottomNavigation>
            )
        } else {
            return (
                <BottomNavigation hidden={false} >
                    <BottomNavigation.Action
                        key="deleteForever"
                        icon="delete-forever"
                        label="Delete"
                        onPress={() => this.props.delete()}
                    />
                    <BottomNavigation.Action
                        key="selectAll"
                        icon="check-box"
                        label="Select All"
                        onPress={() => this.props.selectAll()}
                    />
                    <BottomNavigation.Action
                        key="deselectAll"
                        icon="check-box-outline-blank"
                        label="Deselect"
                        onPress={() => this.props.deselectAll()}
                    />
                    <BottomNavigation.Action
                        key="upload"
                        icon="save"
                        label="Upload"
                        onPress={() => this.props.upload()}
                    />
                    <BottomNavigation.Action
                        key="playlistAdd"
                        icon="playlist-add"
                        label="Add"
                        onPress={() => this.props.openFileAdder()}
                    />
                </BottomNavigation>
            )
        }
    }
}