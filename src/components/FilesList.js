import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, ToastAndroid } from 'react-native';
import { ListItem, Icon, Avatar, ActionButton } from 'react-native-material-ui';
import { ScrollView } from 'react-native';
import connect from 'react-redux/lib/connect/connect';
import FilesListItem from "./FilesListItem";


class FilesList extends Component {

	state = {
	}

	groupSameFiles(files) {
		var ret = [];
		for (var i = 0; i < files.length; i++) {
			var count = 0;
			var name = files[i].name;
			var path = files[i].path;
			var from = i;
			while (i < files.length && files[i].path == path && files[i].name == name) {
				i++;
				count++;
			}
			ret.push({ name, path, count, from })
			i--;
		}
		return ret;
	}

	constructor(props) {
		super(props);
		this.fileRefs = [];
		this.selectAll = this.selectAll.bind(this);
		this.deselectAll = this.deselectAll.bind(this);
		this.removeSelected = this.removeSelected.bind(this);
	}

	selectAll() {
		// ToastAndroid.show(JSON.stringify(this.fileRefs), ToastAndroid.LONG);
		this.fileRefs.forEach(ref => {
			try {
				if (ref) ref.select();
			} catch (err) { }
		});
	}

	deselectAll() {
		this.fileRefs.forEach(ref => {
			try {
				if (ref) ref.deselect();
			} catch (err) { }
		});
	}

	removeSelected() {
		this.fileRefs.reverse().forEach(ref => {
			try {
				if (ref && ref.isSelected()) {
					ref.deleteAll();
					ref.deselect();
				}
			} catch (err) { }
		});
	}

	render() {

		return (
			<ScrollView ref={ref => this.scrollView = ref}
				onContentSizeChange={(contentWidth, contentHeight) => {
					
				}}>
				{this.groupSameFiles(this.props.playlist).map((file, index) => (
					<FilesListItem
						file={file}
						ref={ref => {
							if (ref) this.fileRefs[index] = ref;
						}}
						opened={this.props.opened}
					/>
				))}
			</ScrollView>
		)
	}
}

const mapStateToProps = (state) => ({
	playlist: state.esp.currentPlaylist
})

export default connect(mapStateToProps)(FilesList);