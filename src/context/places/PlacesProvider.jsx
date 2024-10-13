import { useEffect, useReducer } from "react"
import { PlacesContext } from "./PlacesContext"
import { PlacesReducer } from "./PlacesReducer"

const INITIAL_STATE = {
    isLoading:true,
    userLocation: undefined,
}

export const PlacesProvider = ({children}) => {
    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE)

    useEffect(() => {
      dispatch({type: 'SET_USER_LOCATION', payload: [-73.5878100, 45.5088400]})
    }, [])
    
    return (
        <PlacesContext.Provider value={{...state, }}>
            {children}
        </PlacesContext.Provider>
    )
}