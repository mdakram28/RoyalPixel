import RNFS from "react-native-fs";
import { loadingShow, loadingHide } from "./commonActions";

export const savePlaylist = () => ((dispatch, getState) => {

    const name = getState().esp.currentPlaylistName;
    const playlist = getState().esp.currentPlaylist;
    dispatch(loadingShow());
    const path = RNFS.DocumentDirectoryPath + '/playlists' + '/' + name + ".pixpl";
    playlist = playlist.map(item => item.path).join("\n");
    return RNFS.mkdir(RNFS.DocumentDirectoryPath + '/playlists')
        .then(() => {
            return RNFS.writeFile(path, JSON.stringify(playlist), 'utf8')
        })
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingHide()));
});

export const getPlaylistPath = (name) => ((dispatch, getState) => {
    return RNFS.DocumentDirectoryPath + '/playlists/' + name + ".pixpl";
});