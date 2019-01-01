import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { COLOR } from 'react-native-material-ui';
import Dimensions from "Dimensions";
import { connect } from 'react-redux';

var { width, height } = Dimensions.get('window');

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            (this.props.visible ? (
                <View style={[styles.container]}>
                    <ActivityIndicator size="large" color={COLOR.blue500} />
                </View>
            ) : (
                    <View />
                )
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: width,
        // height: height,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        bottom: 0,
        left: 0,
    }
});

const mapStateToProps = (state) => ({
    visible: state.common.loadingVisible
})

export default connect(mapStateToProps)(Loading);
