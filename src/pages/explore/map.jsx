import React, { useEffect, useRef } from 'react'
import mapboxgl, { Marker } from 'mapbox-gl'

import {
  Avatar,
} from "@material-tailwind/react";

// pk.eyJ1IjoidG9wb25pbWEyMDI0IiwiYSI6ImNtMjY1M3FjNzA2N3kyd3B2czhnZm13cDEifQ.vnC86yI57_tHqtqZf3ApVA
function Map({positions}) {
    const mapRef = useRef()
    const mapContainerRef = useRef()
    console.log('Positions',positions)
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidG9wb25pbWEyMDI0IiwiYSI6ImNtMjY1M3FjNzA2N3kyd3B2czhnZm13cDEifQ.vnC86yI57_tHqtqZf3ApVA'

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current, 
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-73.5878100, 45.5088400],
            zoom: 10.12
          });
          mapRef.current.addControl(new mapboxgl.FullscreenControl());

          positions.forEach((marker, index) => {
            
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

            const popUp = new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupContent);
              // Tooltip content
          const mapMarker = new Marker(el)
            .setLngLat([marker.location?._long, marker.location?._lat])
            .setPopup(popUp) // sets a popup on this marker
            .addTo(mapRef.current);

            mapMarker.getElement().setAttribute('title', marker.title);

          });




        //   const el = document.createElement('div');
        //   el.className = 'custom-marker';
        //   el.style.backgroundImage = 'url(https://firebasestorage.googleapis.com/v0/b/toponima2024.appspot.com/o/marker%2Fscientist.svg?alt=media&amp;token=ff028226-0c56-4e17-b51c-c895c461b7dd)';
        //   el.style.width = '25px';
        //   el.style.height = '25px';
        //   el.style.backgroundSize = 'cover';
        //   el.style.borderRadius = '50%';
        //       // Tooltip content
        //     const tooltipContent = `
        //     <div class="bg-white p-2 rounded shadow-lg text-sm">
        //       Tooltip Text
        //     </div>
        //   `;

        //   const tooltip = new mapboxgl.Popup({
        //     closeButton: false,
        //     closeOnClick: false,
        //     offset: 25
        //   }).setHTML(tooltipContent);

        //   const popupContent = `
        //   <div class="max-w-xs rounded overflow-hidden shadow-lg bg-white p-4">
        //     <img class="w-full" src="https://firebasestorage.googleapis.com/v0/b/toponima2024.appspot.com/o/stories%2Fmarcelle.jpg?alt=media&amp;token=7df2bb36-7d5d-461d-85a5-e8171dcf437f" alt="Placeholder Image">
        //     <div class="px-6 py-4">
        //       <div class="font-bold text-xl mb-2">Card Title</div>
        //       <p class="text-gray-700 text-base">
        //         Some description text here.
        //       </p>
        //     </div>
        //     <div class="px-6 pt-4 pb-2">
        //       <a href="https://example.com" class="text-blue-500 hover:text-blue-700">Read More</a>
        //     </div>
        //   </div>
        // `;
        //   const popUp = new mapboxgl.Popup({offset:-150}).setHTML(popupContent);
        //   const marker = new Marker(el)
        //     .setLngLat([positions[0]?.location?._long, positions[0]?.location?._lat])
        //     .setPopup(popUp) // sets a popup on this marker
        //     .addTo(mapRef.current);
        //     marker.getElement().addEventListener('mouseenter', () => tooltip.addTo(mapRef.current));
        //     marker.getElement().addEventListener('mouseleave', () => tooltip.remove());
        
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