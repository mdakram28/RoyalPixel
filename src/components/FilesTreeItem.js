import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-material-ui';
import { ScrollView } from 'react-native';
import { connect } from "react-redux";
import { fetchDir, currentPlaylistAdd } from "../redux/espActions"

class _FilesTreeItem extends Component {

	state = {
		opened: false,
		fetched: false,
		children: []
	}

	onPress() {
		if (this.props.type == "file") {
			this.props.dispatch(currentPlaylistAdd({ name: this.props.name, path: this.props.path }));
		} else {
			if (!this.state.fetched && !this.state.opened) {
				console.log("Fetching ... " + this.props.path);
				this.props.dispatch(fetchDir(this.props.path))
					.then(resp => {
						console.log(resp);
						this.setState({ children: resp, fetched: false });
					}).catch(err => {
						console.error(err);
					});
			}
			this.setState({ opened: !this.state.opened });
		}
	}

	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
		this.countInPlaylist = this.countInPlaylist.bind(this);
	}

	countInPlaylist() {
        // return this.props.playlist.filter(file => this.props.path.indexOf(file.path) >= 0).length;
        return 0;
	}

	render() {
		const count = this.countInPlaylist();
		return (
			<View>
				<ListItem
					divider
					centerElement={{
						primaryText: this.props.name,
					}}
					leftElement={(
						<Icon name={this.props.type == "file" ? "insert-drive-file" : this.state.opened ? "expand-more" : "chevron-right"} />
					)}
					rightElement={count > 0 && (
						<View style={{
							width: 25,
							height: 25,
							borderRadius: 25,
							backgroundColor: this.props.type == "folder" ? "#78909C" : "#BF360C",
							textAlign: 'center',
							flex: 0,
							marginRight: 20,
							justifyContent: "center",
							alignItems: "center"
						}}>
							<Text style={{
								fontWeight: "bold",
								color: "white"
							}}>
								{count}
							</Text>
						</View>
					)}
					onPress={this.onPress}
					style={{
						container: { paddingLeft: this.props.level * 20 }
					}}
				/>
				{this.state.opened && this.state.children.map(child => (
					<FilesTreeItem
						name={child}
						level={this.props.level + 1}
						type={child.endsWith(".pix") ? "file" : "folder"}
						path={this.props.path + "/" + child}
					/>
				))}
			</View>
		)
	}
}

const mapStateToProps = (state) => ({
	playlist: state.esp.currentPlaylist
})

const FilesTreeItem = connect(mapStateToProps)(_FilesTreeItem);

export default FilesTreeItem;