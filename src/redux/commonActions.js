import { playlistDownload, currentPlaylistNameUpdate, currentPlaylistUpdate } from "./espActions";
import { AsyncStorage } from "react-native"


export const loadingShow = () => ({
    type: 'LOADING_SHOW'
});

export const loadingHide = () => ({
    type: 'LOADING_HIDE'
});

export const setConnected = (connected) => ({
    type: 'SET_CONNECTED',
    connected
})

export const updateIp = (ip) => {
    AsyncStorage.setItem("ip", ip);
    return {
        type: 'UPDATE_IP',
        ip
    }
}

export const updatePort = (port) => {
    AsyncStorage.setItem("port", port);
    return {
        type: 'UPDATE_PORT',
        port
    }
}

export const updatePlaylistsFolder = (playlistsFolder) => {
    AsyncStorage.setItem("playlistsFolder", playlistsFolder);
    return {
        type: 'UPDATE_PLAYLISTS_FOLDER',
        playlistsFolder
    }
}

export const refreshSettings = () => (dispatch, getState) => {
    AsyncStorage.getItem("port", (err, port) => dispatch(updatePort(port || "80")))
    AsyncStorage.getItem("ip", (err, ip) => dispatch(updateIp(ip || "192.168.1.1")))
    AsyncStorage.getItem("playlistsFolder", (err, playlistsFolder) => dispatch(updatePlaylistsFolder(playlistsFolder || "/playlists")))
}

export const editPlaylist = (playlistName, navigation) => ((dispatch, getState) => {
    return dispatch(playlistDownload(playlistName))
        .then(() => navigation.navigate("Editor", {
            playlistName: playlistName
        }))
});

export const newPlaylist = (navigation) => ((dispatch, getState) => {
    var today = new Date();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();
    var yyyy = today.getFullYear()
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    const playlistName = `Playlist_${yyyy}_${mm}_${dd}`;
    dispatch(currentPlaylistNameUpdate(playlistName));
    dispatch(currentPlaylistUpdate([]))
    navigation.navigate("Editor", {
        playlistName
    });
});