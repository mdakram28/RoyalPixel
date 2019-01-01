import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ToastAndroid } from 'react-native';
import { Navigator, NativeModules } from 'react-native';
import { COLOR, ThemeContext, getTheme, Toolbar } from 'react-native-material-ui';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider as PaperProvider } from 'react-native-paper';


import reducers from './src/redux/index.js';

import PageEditor from "./src/screens/PageEditor";
import PagePlaylists from "./src/screens/PagePlaylists";
import PageSettings from "./src/screens/PageSettings";
import Loading from "./src/components/Loading";
import WifiList from './src/components/WifiList';


const StackNavigator = createStackNavigator(
	{
		Playlists: { screen: PagePlaylists },
		Editor: { screen: PageEditor }
	}, {
		initialRouteName: "Playlists"
	}
)

const DrawerNavigator = createDrawerNavigator(
	{
		Home: { screen: StackNavigator },
		Settings: { screen: PageSettings },
		Wifi: { screen: WifiList }
	}, {
		initialRouteName: "Wifi"
	}
)

// const AppContainer = createAppContainer(drawerNavigator);
const store = createStore(reducers, applyMiddleware(thunk));

type Props = {};
export default class App extends Component<Props> {

	constructor(props) {
		super(props);
		console.disableYellowBox = true;
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{
					flex: 1
				}}>
					<PaperProvider>
						<DrawerNavigator />
						<Loading />
					</PaperProvider>
				</View>
			</Provider>
		);
	}
}