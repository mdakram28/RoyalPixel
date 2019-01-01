import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-material-ui';
import { ScrollView } from 'react-native';
import { connect } from "react-redux";
import { fetchDir, currentPlaylistAdd } from "../redux/espActions"
import FilesTreeItem from "./FilesTreeItem";

class FilesTree extends Component {
	state = {
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ScrollView>
				<FilesTreeItem name={"All Files"} level={0} type="folder" path="" />
			</ScrollView>
		)
	}

}

export default connect()(FilesTree);