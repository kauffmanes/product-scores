'use client';
import { useRef, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {
  center?: [number, number];
  zoom?: number;
};

export default function Map({ center = [-74.5, 40], zoom = 9 }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    /**
     * This prevents the map from being initialized multiple times,
     * but also prevents it from displaying during dev HMR.
     * Comment this out during development to see the map quickly reload.
     */
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/kauffmanes/cma5f47dr007u01s7g9e9es6q',
      center,
      zoom,
      renderWorldCopies: false
    });

    return () => map.current?.remove();
  }, [center, zoom]);

  return <div ref={mapContainer} className='w-full h-full' />;
}
