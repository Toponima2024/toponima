import { useReducer } from "react"
import { MapContext } from "./MapContext"
import { MapReducer } from "./MapReducer"

const INITIAL_STATE = {
    isMapReady: false,
    map: undefined,
}

export const MapProvider = ({children}) => {
    const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)
    const setMap = (map) => {
        dispatch({type: 'SET_MAP', payload: map})
    }
   
  return (
    <MapContext.Provider value={{...state, setMap}}>
        {children}
    </MapContext.Provider>
  )
}
