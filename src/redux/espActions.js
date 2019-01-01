import { loadingShow, loadingHide } from "./commonActions";
import RNFS from "react-native-fs";

export const playlistsUpdate = (playlists) => ({
    type: 'PLAYLISTS_UPDATE',
    playlists
})

export const currentPlaylistUpdate = (currentPlaylist) => ({
    type: 'CURRENT_PLAYLIST_UPDATE',
    currentPlaylist
})

export const currentPlaylistNameUpdate = (currentPlaylistName) => ({
    type: 'CURRENT_PLAYLIST_NAME_UPDATE',
    currentPlaylistName
})

export const currentPlaylistAdd = (file) => ({
    type: 'CURRENT_PLAYLIST_ADD',
    file
});

export const currentPlaylistRemove = (from, count) => ({
    type: 'CURRENT_PLAYLIST_REMOVE',
    from, count
});

export const playlistsRefresh = () => ((dispatch, getState) => {
    dispatch(loadingShow());

    const { basePath, playlistsFolder } = getState().common;
    const url = `${basePath}/fileList?dir=${encodeURIComponent(playlistsFolder)}`;
    console.log(url);
    fetch(url).then(resp => resp.text())
        .then(resp => {
            console.log(resp);
            return resp.split("\n").filter(file => file.endsWith(".pixpl") || file.indexOf(".") == -1);
        })
        .then((playlists) => dispatch(playlistsUpdate(playlists)))
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingHide()));
})

export const playlistDownload = (playlistName) => ((dispatch, getState) => {
    dispatch(loadingShow());

    const { basePath, playlistsFolder } = getState().common;
    const url = `${basePath}${playlistsFolder}/${playlistName}.pixpl`;
    console.log(url);

    return fetch(url).then(resp => resp.text())
        .then(resp => {
            console.log(resp);
            return resp.split("\n").filter(item => item != "").map(item => {
                return {
                    path: item,
                    name: item.split("/").slice(-1)[0]
                }
            });
        })
        .then((playlist) => dispatch(currentPlaylistUpdate(playlist)))
        .then(() => dispatch(currentPlaylistNameUpdate(playlistName)))
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingHide()));
})

export const fetchDir = (dir) => ((dispatch, getState) => {
    dispatch(loadingShow());

    if (dir == "") dir = "/";
    const { basePath, playlistsFolder } = getState().common;
    const url = `${basePath}/fileList?dir=${encodeURIComponent(dir)}&ext=pix`
    return fetch(url).then(resp => resp.text())
        .then(body => {
            if(body.length == 0) return []; 
            dispatch(loadingHide());
            return body.split("\n");
        });
})

function SaveFile(filename, data) {
    if (OpenedFile == "") return;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = SaveFile_Cb(filename);
    var formData = new FormData();
    formData.append("data", new Blob([data], { type: "text/html" }), filename);
    xmlHttp.open("POST", "/fileUpload");
    xmlHttp.send(formData);
}


export const playlistUpload = () => ((dispatch, getState) => {
    dispatch(loadingShow());

    const getPlaylistPath = (name) => {
        return RNFS.DocumentDirectoryPath + '/playlists/' + name + ".pixpl";
    };

    const { basePath, playlistsFolder } = getState().common;
    const name = getState().esp.currentPlaylistName;
    const uploadPath = playlistsFolder + "/" + name + ".pixpl";
    let file = { uri: "file://" + getPlaylistPath(name), name: uploadPath, type: 'multipart/form-data' };
    let formdata = new FormData();

    formdata.append("data", file, uploadPath);

    console.log(file);
    return fetch(`${basePath}/fileUpload`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formdata
    })
        .catch((err) => console.error(err))
        .finally(() => dispatch(loadingHide()));
})

export const playlistSet = (playlistName) => ((dispatch, getState) => {
    dispatch(loadingShow());
    const { basePath, playlistsFolder } = getState().common;

    const url = `${basePath}/setPlaylist?path=${encodeURIComponent(playlistsFolder+"/"+playlistName+".pixpl")}`;
    return fetch(url)
        .catch((err => console.error(err)))
        .finally(() => dispatch(loadingHide()));
});