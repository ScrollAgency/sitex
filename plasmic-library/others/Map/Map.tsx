import React, { useEffect, useState, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BusinessProperties {
  title?: string;
  location: string;
  company_logo?: string;
  company_website?: string;
  annonce?: string;
  tempsDeTrajet?: string;
  sector?: string;
  contract_type?: string;
  hours_per_week?: string;
  start_date?: string;
  salary?: string;
  way_of_working?: string;
  state?: string;
}

interface MapboxMapProps {
  mapStyle?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  businesses?: BusinessProperties[];
  className?: string;
  searchAddress?: string;
  iconUrl?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  mapStyle = 'mapbox://styles/mapbox/streets-v11',
  latitude = 48.8566,
  longitude = 2.3522,
  zoom = 9,
  businesses = [],
  className = '',
  searchAddress = '',
  iconUrl = '',
}) => {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
      console.error('Mapbox access token is not set');
      return;
    }
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isMounted) {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
        },
        (error) => console.error('Erreur de géolocalisation:', error)
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const calculateMarkerSize = useCallback((zoom: number): number => {
    const minZoom = 5;
    const maxZoom = 15;
    const minSize = 16;
    const maxSize = 48;
    if (zoom <= minZoom) return minSize;
    if (zoom >= maxZoom) return maxSize;
    return minSize + (maxSize - minSize) * (zoom - minZoom) / (maxZoom - minZoom);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !mapboxgl.accessToken) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [longitude, latitude],
      zoom: zoom,
      projection: { name: 'mercator' },
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('load', () => {
      setMapLoaded(true);
      map.setProjection({ name: 'mercator' });

      map.on('zoom', () => {
        const currentZoom = map.getZoom();
        const size = calculateMarkerSize(currentZoom);
        document.querySelectorAll('.custom-marker').forEach((marker) => {
          (marker as HTMLElement).style.width = `${size}px`;
          (marker as HTMLElement).style.height = `${size}px`;
        });
      });
    });
    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapStyle, latitude, longitude, zoom, calculateMarkerSize]);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.setCenter([userLocation.longitude, userLocation.latitude]);
    }
  }, [userLocation]);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const geocodeAddress = useCallback(async (address: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      return data.features && data.features.length > 0 ? data.features[0].center : null;
    } catch (error) {
      console.error('Erreur de géocodage:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const updateBusinessMarkers = async () => {
      if (!mapRef.current || !mapLoaded || !businesses.length) return;

      Object.values(markersRef.current).forEach((marker) => marker.remove());
      markersRef.current = {};

      for (const business of businesses) {
        const coords = await geocodeAddress(business.location);
        if (coords) {
          const markerElement = document.createElement('div');
          markerElement.className = 'custom-marker';
          let markerIcon = iconUrl || '/default-marker.png';
          switch (business.state) {
            case 'base':
              markerIcon = "https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img/Marker/State=PinApplied,%20ShowSalary=False.svg";
              break;
            case 'liked':
              markerIcon = "https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img/Marker/State=PinLiked,%20ShowSalary=False.svg";
              break;
            case 'new':
              markerIcon = "https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img/Marker/State=PinNew,%20ShowSalary=False.svg";
              break;
            case 'last_minute':
              markerIcon = "https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img/Marker/State=PinLastMin,%20ShowSalary=False.svg";
              break;
            case 'applied':
              markerIcon = "https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img/Marker/State=PinApplied,%20ShowSalary=False.svg";
              break;
            default:
              markerIcon = "https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img/Marker/State=PinApplied,%20ShowSalary=False.svg";
          }
          markerElement.style.backgroundImage = `url(${markerIcon})`;
          const currentZoom = mapRef.current?.getZoom() || zoom;
          const size = calculateMarkerSize(currentZoom);
          markerElement.style.width = `${size}px`;
          markerElement.style.height = `${size}px`;
          markerElement.style.backgroundSize = 'cover';

          let travelTime = 'N/A';
          if (userLocation) {
            const userCoords = [userLocation.longitude, userLocation.latitude];
            const businessCoords = coords;
            const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userCoords.join(',')};${businessCoords.join(',')}?access_token=${mapboxgl.accessToken}`;

            try {
              const response = await fetch(url);
              const data = await response.json();
              if (data.routes && data.routes.length > 0) {
                const duration = data.routes[0].duration; // duration in seconds
                const minutes = Math.round(duration / 60);
                travelTime = `${minutes} min`;
              }
            } catch (error) {
              console.error('Erreur de calcul du temps de trajet:', error);
            }
          }

          const popupHtml = `
            <div class="popup-content">
            <div class="popup-header">
            <p>${business.state}</p>
              <img src="${business.company_logo || iconUrl || 'https://idwomihieftgogbgivic.supabase.co/storage/v1/object/public/img//64527ea280c2622554fb4698_logo-scroll.svg'}" alt="${business.title}" />
              <h3>${business.title}</h3>
            </div>
            ${business.annonce ? `<div class="popup-badge">Annonce</div>` : ''}
            <div class="popup-info">
              <div><strong>Adresse:</strong> ${business.location}</div>
              <div><strong>Website:</strong> <a href="${business.company_website || '#'}" target="_blank">${business.company_website || 'N/A'}</a></div>
              <div><strong>Temps de trajet:</strong> ${travelTime}</div>
              <div><strong>Secteur d'activité:</strong> ${business.sector || 'N/A'}</div>
              <div><strong>Type de contrat:</strong> ${business.contract_type || 'N/A'}</div>
              <div><strong>Temps de travail:</strong> ${business.hours_per_week || 'N/A'}<strong>H par semaine</strong></div>
              <div><strong>Début travail:</strong> ${business.start_date ? new Date(business.start_date).toLocaleDateString() : 'N/A'}</div>
              <div><strong>Salaire:</strong> ${business.salary || 'N/A'}</div>
              <div><strong>Mode de travail:</strong> ${business.way_of_working || 'N/A'}</div>
            </div>
            </div>
            `;

          const marker = new mapboxgl.Marker({ element: markerElement })
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup().setHTML(popupHtml))
            .addTo(mapRef.current);

          markersRef.current[business.title || business.location] = marker;
        }
      }
    };

    updateBusinessMarkers();
  }, [businesses, geocodeAddress, iconUrl, mapLoaded, zoom, calculateMarkerSize]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    const userMarkerElement = document.createElement('div');
    userMarkerElement.className = 'custom-marker';
    const userIcon = iconUrl || '/user-icon.png';
    userMarkerElement.style.backgroundImage = `url(${userIcon})`;

    const currentZoom = mapRef.current.getZoom();
    const size = calculateMarkerSize(currentZoom);
    userMarkerElement.style.width = `${size}px`;
    userMarkerElement.style.height = `${size}px`;
    userMarkerElement.style.backgroundSize = 'cover';

    userMarkerRef.current = new mapboxgl.Marker({
      element: userMarkerElement,
    })
      .setLngLat([userLocation.longitude, userLocation.latitude])
      .addTo(mapRef.current);
  }, [userLocation, iconUrl, mapLoaded, calculateMarkerSize]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchAddress.trim() || !mapRef.current || !mapLoaded) return;

      const coords = await geocodeAddress(searchAddress);
      if (coords) {
        mapRef.current.flyTo({
          center: coords,
          zoom: 12,
        });
      }
    };

    handleSearch();
  }, [searchAddress, geocodeAddress, mapLoaded]);

  return (
    <>
      <style>
        {`
          .custom-marker {
            border: none;
            cursor: pointer;
            transition: width 0.3s ease, height 0.3s ease;
          }
          .custom-marker:hover {
            transform: scale(1.8);
          }
          .mapboxgl-popup-content {
            width: 400px;
            font-family: 'Arial', sans-serif;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            padding: 16px;
            position: relative;
            line-height: 0.5;
            z-index: 9999;
          }
          .mapboxgl-popup-content h3 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
          }
          .mapboxgl-popup-content p {
            font-size: 14px;
            color: #555;
            margin: 4px 0;
          }
          .mapboxgl-popup-content a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
          }
          .mapboxgl-popup-content a:hover {
            text-decoration: underline;
          }
          .popup-badge {
            display: inline-block;
            background: linear-gradient(90deg, #ff6b6b, #ff8e53);
            color: white;
            font-size: 12px;
            font-weight: bold;
            padding: 4px 10px;
            border-radius: 8px;
            margin-bottom: 10px;
          }
          .popup-header {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .popup-header img {
            width: 40px;
            height: 40px;
            object-fit: fit;
          }
          .popup-info {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .popup-info div {
            background: #f5f5f5;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 12px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .popup-info div img {
            width: 14px;
            height: 14px;
          }
        `}
      </style>
      <div
        ref={mapContainerRef}
        className={`mapbox-map ${className}`}
        style={{ width: '100%', height: '500px', borderRadius: '16px', position: 'relative' }}
      />
    </>
  );
};

export default MapboxMap;
