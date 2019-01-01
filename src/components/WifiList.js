import React, { Component } from 'react';
import { View, Text } from 'react-native';
import WifiManager from 'react-native-wifi';
import { List } from 'react-native-paper';
import { PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import InputDialog from './dialogs/InputDialog';
import { ToastAndroid } from 'react-native';


class WifiList extends Component {

    state = {
        wifiList: [],
        password: '',
        ssid: '',
        dialogVisible: false,

    };

    constructor(props) {
        super(props);
        this.refreshWifiList = this.refreshWifiList.bind(this);
        this.connectToWifi = this.connectToWifi.bind(this);
    }

    refreshWifiList() {
        WifiManager.reScanAndLoadWifiList((wifiList) => {
            wifiList = JSON.parse(wifiList);
            console.log("WifiList", wifiList);
            this.setState({ wifiList });
        }, (err) => console.error(err))
    }

    connectToWifi() {
        WifiManager.connectToProtectedSSID(this.state.ssid, this.state.password, true)
        .then(() => {
            ToastAndroid("Connected to device "+this.state.ssid);
        })
        .catch(console.error);
    }

    componentDidMount() {
        try {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks'
                }
            ).then(granted => {

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Thank you for your permission! :)");
                } else {
                    console.log("You will not able to retrieve wifi available networks list");
                }
            }).catch(console.error)
        } catch (err) {
            console.warn(err)
        }
        this.refreshWifiList();
    }


    render() {
        return (
            <View>
                {this.state.wifiList.map(ap =>
                    <List.Item
                        title={ap.SSID}
                        description={"Level : " + ap.level}
                        left={props => <List.Icon {...props} icon="wifi" />}
                        onPress={()=>this.setState({ssid: ap.SSID, dialogVisible: true})}
                    />
                )}
                <InputDialog
                    visible={this.state.dialogVisible}
                    title={'Device Password'}
                    label={'PASSWORD'}
                    description={"Enter password for "+this.state.ssid}
                    positiveText="CONNECT"
                    negativeText="CANCEL"
                    defaultValue={this.state.password}
                    onPositiveAction={(password) => {
                        this.setState({password})
                        this.connectToWifi();
                    }}
                    close={() => this.setState({ dialogVisible: false })}
                />
            </View>
        );
    }
}

export default WifiList;
