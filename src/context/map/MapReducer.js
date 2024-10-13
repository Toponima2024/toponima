export const MapReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MAP_READY':
            return {
                ...state,
                isMapReady: action.payload
            }
        case 'SET_MAP':
            return {
                ...state,
                isMapReady: true,
                markers: [],
                map: action.payload
            }
        default:
            return state
    }

}