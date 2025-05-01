'use client';
import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Products } from '../constants';
import MapPopup from './MapPopup';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Props = {
  center?: [number, number];
  zoom?: number;
  product: Products;
};

export default function Map({
  center = [-74.5, 40],
  zoom = 9,
  product
}: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  const fillLayerId = 'scored-country-fill';
  const allCountriesLayerId = 'all-countries-interaction';

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.remove();
    }
  }, [product]);

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
        loadScores(product);
      });
    } else {
      if (map.current.isStyleLoaded()) {
        loadScores(product);
      } else {
        map.current.once('load', () => {
          loadScores(product);
        });
      }
    }

    async function loadScores(product: string) {
      // 1. Fetch the data
      const response = await fetch(`/api/scores?product=${product}`);
      if (!response.ok) return;

      const data = await response.json();
      if (!data.scores || typeof data.scores !== 'object') return;

      const scoreEntries = Object.entries(data.scores);
      const scoredCountries = Object.keys(data.scores);

      // 2. Setup the base countries map
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

      map.current!.on('click', allCountriesLayerId, (e) => {
        const feature = e.features?.[0];
        if (!feature) return;

        const isoCode = feature.properties?.['iso_3166_1_alpha_3'];
        const countryName = feature.properties?.['name_en'];
        const score = data.scores?.[isoCode] ?? 'N/A';

        const container = document.createElement('div');

        ReactDOM.createRoot(container).render(
          <MapPopup country={countryName} iso={isoCode} score={score} />
        );

        if (popupRef.current) popupRef.current.remove();

        popupRef.current = new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setDOMContent(container)
          .addTo(map.current!);
      });

      // Handle populating the map with the scores
      const colorMatchExpression: mapboxgl.ExpressionSpecification = [
        'match',
        ['get', 'iso_3166_1_alpha_3'],
        ...scoreEntries.flatMap(([iso, score]) => [
          iso,
          getColorForScore(score as number)
        ]),
        '#000000'
      ];

      // If there are no results, remove the scoring layer
      if (scoredCountries.length === 0) {
        if (map.current!.getLayer(fillLayerId)) {
          map.current!.removeLayer(fillLayerId);
        }
        return;
      }

      // If the layer exists, update its paint and filter
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
    }
  }, [center, zoom, product]);

  return <div ref={mapContainer} className='w-full h-full' />;
}

function getColorForScore(score: number): string {
  const clamped = Math.max(0, Math.min(100, score));
  const hue = (clamped / 100) * 120;
  return `hsl(${hue}, 100%, 40%)`;
}
