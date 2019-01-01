import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-material-ui';
import {
    // SettingsDividerShort,
    SettingsDividerLong,
    SettingsEditText,
    SettingsCategoryHeader,
    SettingsSwitch,
    SettingsPicker
} from "../components/settings";
import { connect } from 'react-redux';
import { updateIp, updatePort, refreshSettings, updatePlaylistsFolder } from '../redux/commonActions';

class PageSettings extends Component {
    static navigationOptions = {
        drawer: () => ({
            label: 'Settings',
        })
    }

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.dispatch(refreshSettings());
    }

    render() {
        return (
            <ScrollView
                style={{
                    flex: 1
                }}
            >
                <SettingsCategoryHeader
                    title={"DEVICE"}
                    textStyle={{ color: colors.monza }}
                />
                <SettingsDividerLong android={false} />
                <SettingsEditText
                    title="IP Address"
                    valuePlaceholder="xxx.xxx.xxx.xxx"
                    negativeButtonTitle={"Cancel"}
                    buttonRightTitle={"Save"}
                    onValueChange={value => this.props.dispatch(updateIp(value))}
                    value={this.props.ip || ''}
                />
                <SettingsEditText
                    title="TCP Port"
                    valuePlaceholder="0 - 25535"
                    negativeButtonTitle={"Cancel"}
                    buttonRightTitle={"Save"}
                    onValueChange={value => this.props.dispatch(updatePort(value))}
                    value={this.props.port || ''}
                />
                <SettingsEditText
                    title="Playlists Folder"
                    valuePlaceholder="/playlists"
                    negativeButtonTitle={"Cancel"}
                    buttonRightTitle={"Save"}
                    onValueChange={value => this.props.dispatch(updatePlaylistsFolder(value))}
                    value={this.props.playlistsFolder || ''}
                />
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    ip: state.common.ip,
    port: state.common.port,
    playlistsFolder: state.common.playlistsFolder
});

const colors = {
    white: "#FFFFFF",
    monza: "#C70039",
    switchEnabled: "#C70039",
    switchDisabled: "#efeff3",
    blueGem: "#27139A",
};

export default connect(mapStateToProps)(PageSettings);
