import React, { Component } from 'react';
import {
    View,
    Text,
    Modal
} from 'react-native';

import { Dialog, DialogDefaultActions } from "react-native-material-ui";

import { TextInput } from 'react-native-paper';


class InputDialog extends Component {

    state = {
        value: this.props.defaultValue
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.defaultValue != this.props.defaultValue) {
            this.setState({
                value: newProps.defaultValue
            })
        }
    }

    render() {
        return (
            <Modal animationType={"slide"} transparent={true}
                visible={this.props.visible}
                onRequestClose={() => { console.log("Modal has been closed.") }}>

                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 100
                }}>

                    <Dialog>
                        <Dialog.Title><Text>{this.props.title}</Text></Dialog.Title>
                        <Dialog.Content>
                            <Text>{this.props.description}</Text>
                            <TextInput
                                style={{ backgroundColor: "white" }}
                                label={this.props.label || ""}
                                onChangeText={(value) => this.setState({ value })}
                                value={this.state.value}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <DialogDefaultActions
                                actions={[this.props.negativeText, this.props.positiveText]}
                                options={{ ok: { disabled: this.props.value == "" } }}
                                onActionPress={(action) => {
                                    this.props.close();
                                    if (action == this.props.positiveText) {
                                        this.props.onPositiveAction(this.state.value);
                                    }
                                }}
                            />
                        </Dialog.Actions>
                    </Dialog>
                </View>
            </Modal>
        );
    }
}

export default InputDialog;
