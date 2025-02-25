'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for missing marker icons in Leaflet when using webpack/Next.js
L.Icon.Default.prototype.options.iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
L.Icon.Default.prototype.options.iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
L.Icon.Default.prototype.options.shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const LiveMap: React.FC = () => {
  const [position, setPosition] = useState({ lat: 52.5200, lng: 13.4050 }); // default to Berlin

  useEffect(() => {
    if (navigator.geolocation) {
      const watcher = navigator.geolocation.watchPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watcher);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div className="relative">
      <MapContainer center={[position.lat, position.lng]} zoom={15} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position.lat, position.lng]}>
          <Popup>You are here!</Popup>
        </Marker>
        <RecenterAutomatically lat={position.lat} lng={position.lng} />
      </MapContainer>
      <div className="location-bar absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Location bar content goes here */}
      </div>
    </div>
  );
};

export default LiveMap;
