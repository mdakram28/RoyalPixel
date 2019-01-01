import RNFS from "react-native-fs";

export function savePlaylist(name, list) {
    // console.log(name, list)
    const path = RNFS.DocumentDirectoryPath + '/playlists' + '/' + name + ".pixpl";
    // console.log(RNFS);
    list = list.map(item => item.path).join("\n");
    return RNFS.mkdir(RNFS.DocumentDirectoryPath + '/playlists').then(()=>{
        return RNFS.writeFile(path,list, 'utf8')
    });
}

export function getPlaylistPath(name) {
    return RNFS.DocumentDirectoryPath + '/playlists/' + name + ".pixpl";
}