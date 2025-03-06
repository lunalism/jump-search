'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGeolocation() {
  const [location, setLocation] = useState<{
    latitude?: number;
    longitude?: number;
    city?: string;
    country?: string;
    error?: string;
    loading: boolean;
  }>({ loading: true });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude, loading: false });
              await fetchLocationDetails(latitude, longitude);
            },
            (error) => {
              console.error('Geolocation error:', error.message);
              setLocation({ error: error.message, loading: false });
              fetchLocationFromIP();
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // 정확도 높임, 타임아웃 5초
          );
        } else {
          setLocation({ error: 'Geolocation is not supported by this browser.', loading: false });
          fetchLocationFromIP();
        }
      } catch (error) {
        console.error('Location fetch error:', error);
        setLocation({ error: 'Failed to fetch location.', loading: false });
      }
    };

    fetchLocation();
  }, []);

  const fetchLocationFromIP = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const { city, country_name: country, latitude, longitude } = response.data;
      setLocation({ city, country, latitude, longitude, loading: false });
    } catch (error) {
      console.error('IP Geolocation error:', error);
      setLocation((prev) => ({ ...prev, error: 'Failed to fetch location from IP.', loading: false }));
    }
  };

  const fetchLocationDetails = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ko`
      );
      const { city, countryName: country } = response.data;
      setLocation((prev) => ({
        ...prev,
        city: city || prev.city,
        country: country || prev.country,
        loading: false,
      }));
    } catch (error) {
      console.error('Reverse Geocode error:', error);
      setLocation((prev) => ({ ...prev, error: 'Failed to fetch location details.', loading: false }));
    }
  };

  return location;
}