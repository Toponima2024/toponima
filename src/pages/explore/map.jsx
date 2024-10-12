import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
// pk.eyJ1IjoidG9wb25pbWEyMDI0IiwiYSI6ImNtMjY1M3FjNzA2N3kyd3B2czhnZm13cDEifQ.vnC86yI57_tHqtqZf3ApVA
function Map() {
    const mapRef = useRef()
    const mapContainerRef = useRef()

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidG9wb25pbWEyMDI0IiwiYSI6ImNtMjY1M3FjNzA2N3kyd3B2czhnZm13cDEifQ.vnC86yI57_tHqtqZf3ApVA'

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-73.5878100, 45.5088400],
            zoom: 10.12
          });
          mapRef.current.addControl(new mapboxgl.FullscreenControl());
        return () => {
          mapRef.current.remove()
        }
      }, [])

  return (
    <div className='container mt-5 mb-5' style={{backgroundColor: '#f0fafb', padding:'10px'}}>
        
        <div 
            style={{ width: '100%', height: '50vh',  top: 0, left: 0 }}
            ref={mapContainerRef}
            />
    </div>
  )
}

export default Map