
import {FC, useRef, useEffect, useState} from "react";
import mapboxgl from 'mapbox-gl';
import {useTranslation} from "react-i18next";
//@ts-ignore
import MapboxDirections from '@mapbox/mapbox-gl-directions'

import './index.scss'

const Map: FC = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZ3V2YW5jaDk5IiwiYSI6ImNrdm0xbzBldjliemIybnM3MG5xMjlsMTkifQ.alVPjmXM8JIac36zVsJnZQ'

  const {t} = useTranslation('translation')

  const mapContainer = useRef<any>(null)
  const map = useRef<mapboxgl.Map | null>(null);

  const [viewport, setViewport] = useState<Record<string, number>>({
    lng: 23.83885,
    lat: 53.71362,
    zoom: 15
  })

  const {lng, lat, zoom} = viewport

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    let market = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({offset: 30})
        .setHTML('<h4>' + 'Ata Durum' + '</h4>'))
      .addTo(map.current)

  });

  useEffect(() => {
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: false,
      geometries: 'geojson',
      controls: {instructions: false},
      flyTo: false
    });
    if (map.current){
      map.current.addControl(directions, 'top-right');
      map.current.scrollZoom.enable();
    }
  }, [])

  return (
    <section className='map'>
      <aside className='map__location'>{t('location')}</aside>
      <div ref={mapContainer} className='map-container'/>
    </section>
  )
}

export default Map