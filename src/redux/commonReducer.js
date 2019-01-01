import { combineReducers } from 'redux';
import { AsyncStorage } from "react-native"

const initialState = {
    loadingVisible: false,
    basePath: 'http://192.168.1.2:80',
    ip: '192.168.1.2',
    port: "80",
    playlistsFolder: '/playlists',
    connected: false
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "LOADING_SHOW":
            return { ...state, loadingVisible: true };

        case "LOADING_HIDE":
            return { ...state, loadingVisible: false };

        case "UPDATE_IP":
            return { ...state, basePath: `http://${action.ip}:${state.port}`, ip: action.ip };

        case "UPDATE_PORT":
            return { ...state, basePath: `http://${state.ip}:${action.port}`, port: action.port };

        case "UPDATE_PLAYLISTS_FOLDER":
            return { ...state, playlistsFolder: action.playlistsFolder }

        case "SET_CONNECTED":
            return { ...state, connected: action.connected }

        default:
            return state
    }
};