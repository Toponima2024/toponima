import React, { useLayoutEffect, useRef } from 'react'
import mapboxgl, { Map, Marker, Popup } from 'mapbox-gl'

import { MapContext, PlacesContext } from '@/context';

function MapView({positions}) {
    const mapContainerRef = useRef()
    const {isLoading, userLocation} = React.useContext(PlacesContext)
    const {setMap, map } = React.useContext(MapContext)
    useLayoutEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoidG9wb25pbWEyMDI0IiwiYSI6ImNtMjY1M3FjNzA2N3kyd3B2czhnZm13cDEifQ.vnC86yI57_tHqtqZf3ApVA'
      if(!isLoading){
        const map = new Map({
          container: mapContainerRef.current, 
          style: 'mapbox://styles/mapbox/streets-v12',
          center: userLocation,
          zoom: 10.12
        });
        map.addControl(new mapboxgl.FullscreenControl());

        positions.forEach((marker) => {        
        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.backgroundImage = `url(${marker.marker})`;
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.backgroundSize = 'cover';
        el.style.borderRadius = '50%';

        const popupContent = `
        <div class="max-w-xs rounded overflow-hidden shadow-lg bg-white p-4">
          <img class="w-full" src=${marker.mainImage} alt="Placeholder Image">
          <div class="font-bold text-sm mb-2">${marker.title}</div>              
        </div>
      `;

        const popUp = new Popup({ offset: 25 })
        .setHTML(popupContent);
          // Tooltip content
      const mapMarker = new Marker(el)
        .setLngLat([marker.location?._long, marker.location?._lat])
        .setPopup(popUp) // sets a popup on this marker
        .addTo(map);

        mapMarker.getElement().setAttribute('title', marker.title);

      });
        
        setMap(map)
      }

    }, [isLoading,positions])

    if(isLoading){
      return (<h1>Loading...</h1>)
    }

  return (
    <div className='container mt-5 mb-5' style={{backgroundColor: '#f0fafb', padding:'10px'}}>
       <p>
       Pick a location on the map and find the story behind the name.
       </p>
        <div 
            style={{ width: '100%', height: '50vh',  top: 0, left: 0 }}
            ref={mapContainerRef}
            />
               <p>
               Explore the stories and find the meaning behind the name.
       </p>
    </div>
  )
}

export default MapView