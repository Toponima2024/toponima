export const PlacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_LOCATION':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}