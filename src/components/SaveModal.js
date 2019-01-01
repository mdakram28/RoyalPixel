import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput
} from 'react-native';

import { Dialog, DialogDefaultActions } from "react-native-material-ui";

class SaveModal extends Component {
    constructor(props) {
        super(props);
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
                        <Dialog.Title><Text>Save Pixel Playlist</Text></Dialog.Title>
                        <Dialog.Content>
                            <Text>
                                Do you want to save this playlist?
                        </Text>
                            <TextInput
                                // style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                onChangeText={(playlistName) => this.props.onChangeText(playlistName)}
                                value={this.props.playlistName}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <DialogDefaultActions
                                actions={['cancel', 'ok']}
                                options={{ ok: { disabled: this.props.playlistName == "" } }}
                                onActionPress={(action) => {
                                    this.props.close();
                                    if (action == "cancel") {
                                    } else if (action == "ok") {
                                        this.props.onSave();
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

export default SaveModal;
