import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Animated, ToastAndroid } from 'react-native';
import { ListItem, Icon, Avatar, ActionButton } from 'react-native-material-ui';
import { currentPlaylistRemove } from "../redux/espActions"

class FilesListItem extends Component {

    state = {
        selected: false
    }

    isSelected() {
        return this.state.selected;
    }
    deleteAll() {
        ToastAndroid.show(JSON.stringify(this.props.file), ToastAndroid.LONG);
        this.props.currentPlaylistRemove(this.props.file.from, this.props.file.count);
    }
    select() {
        this.setState({ selected: true })
    }
    deselect() {
        this.setState({ selected: false })
    }

    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.deselect = this.deselect.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    render() {
        if (this.props.opened) {
            return (<ListItem
                divider
                style={{
                    container: {
                        // backgroundColor: this.state.selected ? "#BBDEFB" : "white"
                    }
                }}
                leftElement={this.props.file.count > 1 ? (
                    <Avatar text={this.props.file.count + ""}
                        style={{
                            container: {
                                width: 30,
                                height: 20,
                                borderRadius: 30
                            }
                        }} />
                ) : <View />}
                centerElement={{
                    primaryText: this.props.file.name,
                    secondaryText: this.props.file.path
                }}
                onPress={() => {
                    this.props.currentPlaylistRemove(this.props.file.from, 1);
                }}
            />)
        } else {
            return (
                <ListItem
                    divider
                    style={{
                        container: {
                            backgroundColor: this.state.selected ? "#BBDEFB" : "white"
                        }
                    }}
                    leftElement={this.props.file.count > 1 ? (
                        <Avatar text={this.props.file.count + ""}
                            style={{
                                container: {
                                    width: 30,
                                    height: 20,
                                    borderRadius: 30
                                }
                            }} />
                    ) : <View />}
                    centerElement={{
                        primaryText: this.props.file.name,
                        secondaryText: this.props.file.path
                    }}
                    rightElement={(
                        <View style={{
                            flexDirection: "row",
                            paddingRight: 20,
                            width: 90,
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Icon name="remove-circle-outline" color="#FF6E40" onClick={() => { this.props.currentPlaylistRemove(this.props.file.from, 1); }} />
                            <Icon name="menu" size={30} />
                        </View>
                    )}
                    onPress={() => {
                        this.setState({ selected: !this.state.selected })
                    }}
                />
            )
        }
    }
}

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = (dispatch) => ({
    currentPlaylistRemove: (from, count) => dispatch(currentPlaylistRemove(from, count))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilesListItem);
