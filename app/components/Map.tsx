'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import MapPopup from './MapPopup';
import { Product } from '../types';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {
  center?: [number, number];
  zoom?: number;
  product: Product;
  scores: Record<string, number>;
};

export default function Map({
  center = [-74.5, 40],
  zoom = 9,
  product,
  scores
}: Props) {
  const router = useRouter();

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const fillLayerId = 'scored-country-fill';
  const allCountriesLayerId = 'all-countries-interaction';

  const scoreEntries = Object.entries(scores);
  const scoredCountries = Object.keys(scores);

  const setPointerCursor = useCallback(() => {
    map.current!.getCanvas().style.cursor = 'pointer';
  }, [map]);

  const resetCursor = useCallback(() => {
    map.current!.getCanvas().style.cursor = '';
  }, [map]);

  const handleCountryClick = useCallback(
    (e: mapboxgl.MapMouseEvent) => {
      const feature = e.features?.[0];
      if (!feature) return;

      // const latLng = e.lngLat;
      const isoCode = feature.properties?.['iso_3166_1_alpha_3'];
      const countryName = feature.properties?.['name_en'];
      const score = scores?.[isoCode] ?? 'N/A';

      const params = new URLSearchParams(window.location.search);

      params.set('iso', isoCode);
      params.set('country', countryName);
      router.push(`${window.location.pathname}?${params.toString()}`);

      const container = document.createElement('div');

      ReactDOM.createRoot(container).render(
        <MapPopup country={countryName} iso={isoCode} score={score} />
      );

      if (popupRef.current) popupRef.current.remove();

      popupRef.current = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setDOMContent(container)
        .addTo(map.current!);
    },
    [router, popupRef, map, scores]
  );

  const addScoresToMap = useCallback(() => {
    const colorMatchExpression: mapboxgl.ExpressionSpecification = [
      'match',
      ['get', 'iso_3166_1_alpha_3'],
      ...scoreEntries.flatMap(([iso, score]) => [
        iso,
        getColorForScore(score as number)
      ]),
      '#000000'
    ];

    if (scoredCountries.length === 0) {
      if (map.current!.getLayer(fillLayerId)) {
        map.current!.removeLayer(fillLayerId);
      }
      return;
    }

    if (map.current!.getLayer(fillLayerId)) {
      map.current!.setPaintProperty(
        fillLayerId,
        'fill-color',
        colorMatchExpression
      );
      map.current!.setFilter(fillLayerId, [
        'in',
        'iso_3166_1_alpha_3',
        ...scoredCountries
      ]);
    } else {
      map.current!.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: 'composite',
        'source-layer': 'country_boundaries',
        filter: ['in', 'iso_3166_1_alpha_3', ...scoredCountries],
        paint: {
          'fill-color': colorMatchExpression,
          'fill-opacity': 0.8
        }
      });
    }
  }, [map, fillLayerId, scoreEntries, scoredCountries]);

  const initMapLayers = useCallback(() => {
    // 1. Build the base country layer
    if (!map.current!.getLayer(allCountriesLayerId)) {
      map.current!.addLayer({
        id: allCountriesLayerId,
        type: 'fill',
        source: 'composite',
        'source-layer': 'country_boundaries',
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0
        }
      });
    }

    // 2. Setup new events
    map.current!.on('mouseenter', allCountriesLayerId, setPointerCursor);

    map.current!.on('mouseleave', allCountriesLayerId, () => resetCursor);

    // 3. Setup click events
    map.current!.on('click', allCountriesLayerId, handleCountryClick);

    // 4. Add the scores to the map
    addScoresToMap();
  }, [handleCountryClick, addScoresToMap, setPointerCursor, resetCursor]);

  // clean up event listeners
  useEffect(() => {
    return () => {
      // remove the event listeners - prevents excess requests
      map.current!.off('click', allCountriesLayerId, handleCountryClick);
      map.current!.off('mouseenter', allCountriesLayerId, setPointerCursor);
      map.current!.off('mouseleave', allCountriesLayerId, resetCursor);
    };
  }, [handleCountryClick, setPointerCursor, resetCursor]);

  useEffect(() => {
    /**
     * This prevents the map from being initialized multiple times,
     * but also prevents it from displaying during dev HMR.
     * Comment this out during development to see the map quickly reload.
     */
    if (!mapContainer.current) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/kauffmanes/cma5f47dr007u01s7g9e9es6q',
        center,
        zoom,
        renderWorldCopies: false
      });

      map.current.on('load', () => {
        initMapLayers();

        // center the map on the ISO
        // if (country) {
        //   map.current?.flyTo({
        //     center: country.coordinates,
        //     zoom: 1,
        //     essential: true
        //   });
        // }
      });
    } else {
      if (map.current.isStyleLoaded()) {
        initMapLayers();
        return;
      } else {
        map.current.once('load', () => {
          initMapLayers();
        });
      }
    }
  }, [center, zoom, initMapLayers]);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.remove();
    }
  }, [product]);

  return <div ref={mapContainer} className='w-full h-full' />;
}

function getColorForScore(score: number): string {
  const clamped = Math.max(0, Math.min(100, score));
  const hue = (clamped / 100) * 120;
  return `hsl(${hue}, 100%, 40%)`;
}
