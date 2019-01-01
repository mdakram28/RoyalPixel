const initialState = {
    playlists: [],
    currentPlaylist: [],
    currentPlaylistName: 'Untitled'
}

export default (state = initialState, action) => {
    switch (action.type) {

        case "PLAYLISTS_UPDATE":
            return {
                ...state,
                playlists: action.playlists
            };

        case "CURRENT_PLAYLIST_UPDATE":
            return {
                ...state,
                currentPlaylist: action.currentPlaylist
            };

        case "CURRENT_PLAYLIST_NAME_UPDATE":
            return {
                ...state,
                currentPlaylistName: action.currentPlaylistName
            };

        case "CURRENT_PLAYLIST_ADD":
            return {
                ...state,
                currentPlaylist: [...state.currentPlaylist, action.file]
            };

        case "CURRENT_PLAYLIST_REMOVE":
            const playlist = state.currentPlaylist;
            const { from, count } = action;
            console.log(playlist.length, [...playlist.slice(0, from), ...playlist.slice(from + count)].length)
            return {
                ...state,
                currentPlaylist: [...playlist.slice(0, from), ...playlist.slice(from + count)]
            };

        default:
            return state
    }
};
