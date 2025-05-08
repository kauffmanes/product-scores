import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function getFeatureCenter(
  feature: mapboxgl.GeoJSONFeature
): [number, number] {
  const coords =
    feature.geometry.type === 'Polygon'
      ? feature.geometry.coordinates[0]
      : feature.geometry.type === 'MultiPolygon'
      ? feature.geometry.coordinates[0][0]
      : [];

  const lats = coords.map((c) => c[1]);
  const lngs = coords.map((c) => c[0]);

  return [
    (Math.min(...lngs) + Math.max(...lngs)) / 2,
    (Math.min(...lats) + Math.max(...lats)) / 2
  ];
}

export function getColorForScore(score: number): string {
  const clamped = Math.max(0, Math.min(100, score));
  const hue = (clamped / 100) * 120;
  return `hsl(${hue}, 100%, 40%)`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocaleDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}
