import React from 'react'
import Map, {AttributionControl} from 'react-map-gl';


const MapBox = () => {
  return (
    <Map
    mapboxAccessToken="pk.eyJ1IjoibWFoYXRhYiIsImEiOiJjbGxxOGRqYzMwMXM0M3FwZ3ZlNGxobXdtIn0.rKTE-PSOjILQZtdsO6acqA"
    initialViewState={{
      longitude: 78.9629,
      latitude: 20.5937,
      zoom: 3
    }}
    attributionControl={false}
    style={{width: 600, height: 400}}
    mapStyle="mapbox://styles/mahatab/cllvydbuz00e501pj5mzo25sc"
    
  />
  )
}

export default MapBox