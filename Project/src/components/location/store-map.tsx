"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type L from "leaflet";

// Interface for store locations
interface StoreLocation {
  id: string;
  position: [number, number];
  title: string;
  address: string;
  phone: string;
  distance: string;
}

// Dummy data for store locations
const dummyLocations: StoreLocation[] = [
  {
    id: "1",
    position: [28.6139, 77.209],
    title: "Steplo Store - Karachi",
    address: "123 Steplo Street, Karachi, 110001",
    phone: "+91 11-4567-8900",
    distance: "1.2 miles away",
  },
  {
    id: "2",
    position: [28.6229, 77.219],
    title: "Steplo Store - Islamabad",
    address: "456 Sport Avenue, Islamabad, 110002",
    phone: "+91 11-4567-8901",
    distance: "2.4 miles away",
  },
];

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const MarkerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false, loading: () => null }
);

const PopupComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false, loading: () => null }
);
export default function StoreMap() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const defaultCenter: [number, number] = [28.6139, 77.209];
  const [leaflet, setLeaflet] = useState<typeof L | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const loadLeaflet = async () => {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      L.Icon.Default.mergeOptions({
        iconUrl: "/markers/default-marker.svg",
        iconRetinaUrl: "/markers/default-marker.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
        shadowUrl: "",
      });

      setLeaflet(L);
    };

    loadLeaflet();
  }, []);

  if (!isClient || !leaflet) return null;

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {dummyLocations.map((store) => (
          <MarkerComponent
            key={store.id}
            position={store.position}
            icon={
              new leaflet.Icon({
                iconUrl:
                  selectedStore === store.id
                    ? "/markers/selected-marker.svg"
                    : "/markers/default-marker.svg",
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20],
              })
            }
            eventHandlers={{
              click: () => setSelectedStore(store.id),
            }}
          >
            <PopupComponent>
              <div className="p-2">
                <h3 className="font-bold">{store.title}</h3>
                <p className="text-sm text-gray-600">{store.distance}</p>
                <p className="text-sm mt-2">{store.address}</p>
                <p className="text-sm">{store.phone}</p>
              </div>
            </PopupComponent>
          </MarkerComponent>
        ))}
      </MapContainer>
    </div>
  );
}
