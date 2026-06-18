import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { api } from '../api/client';
import type { MapLayerResponse } from '../types';

type GeoJsonFeature = MapLayerResponse['features'][number];
type LayerSummary = { name: string; data: GeoJsonFeature[]; color: string };

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function MapView() {
  const [layers, setLayers] = useState<MapLayerResponse | null>(null);

  useEffect(() => {
    void api.get<MapLayerResponse>('/maps/layers').then((response: { data: MapLayerResponse }) => setLayers(response.data));
  }, []);

  const geoJsonLayers = useMemo(
    () => [
      { name: 'FRA Lands', data: layers?.features.filter((feature: GeoJsonFeature) => feature.properties.layer === 'FRA Lands') ?? [], color: '#10b981' },
      { name: 'Villages', data: layers?.features.filter((feature: GeoJsonFeature) => feature.properties.layer === 'Villages') ?? [], color: '#3b82f6' },
      { name: 'Forest Areas', data: layers?.features.filter((feature: GeoJsonFeature) => feature.properties.layer === 'Forest Areas') ?? [], color: '#f59e0b' },
      { name: 'Water Bodies', data: layers?.features.filter((feature: GeoJsonFeature) => feature.properties.layer === 'Water Bodies') ?? [], color: '#38bdf8' },
    ],
    [layers],
  ) as LayerSummary[];

  const markers = layers?.features.filter((feature: GeoJsonFeature) => feature.geometry.type === 'Point') ?? [];

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
      <div className="map-container glass-panel overflow-hidden rounded-3xl p-3 shadow-glow">
        <MapContainer center={[21.0, 78.0]} zoom={5} scrollWheelZoom className="h-full min-h-[560px]">
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geoJsonLayers.map((layer: LayerSummary) =>
            layer.data.map((feature: GeoJsonFeature, index: number) => (
              <GeoJSON
                key={`${layer.name}-${index}`}
                data={feature as any}
                style={() => ({ color: layer.color, weight: 2, fillOpacity: 0.2 })}
              />
            )),
          )}
          {markers.map((feature: GeoJsonFeature, index: number) => {
            const [longitude, latitude] = feature.geometry.coordinates as [number, number];
            return (
              <Marker key={index} position={[latitude, longitude]} icon={markerIcon}>
                <Popup>
                  <div className="space-y-1 text-sm text-slate-900">
                    <p className="font-semibold">{feature.properties.name}</p>
                    <p>{feature.properties.village}</p>
                    <p>{feature.properties.status}</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <div className="glass-panel rounded-3xl p-5">
        <p className="font-display text-xl font-bold text-emerald-200">Layer Controls</p>
        <div className="mt-5 space-y-4 text-sm text-white/75">
          {geoJsonLayers.map((layer: LayerSummary) => (
            <div key={layer.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">{layer.name}</p>
              <p className="mt-1">{layer.data.length} visible features</p>
            </div>
          ))}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-semibold text-white">Village Search</p>
            <p className="mt-1">Use the backend search endpoint to jump to district and village records.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
