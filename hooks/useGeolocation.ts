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
  }>({ loading: true }); // 기본값으로 초기화, localStorage 제거

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        // 캐싱된 위치 데이터 로드 (클라이언트 전용)
        const cachedLocation = typeof window !== 'undefined' ? localStorage.getItem('location') : null;
        if (cachedLocation) {
          const parsedLocation = JSON.parse(cachedLocation);
          if (isMounted) {
            setLocation((prev) => ({ ...prev, ...parsedLocation, loading: false }));
          }
          return; // 캐시가 있으면 바로 종료
        }

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const newLocation = { latitude, longitude, loading: false };
              if (isMounted) {
                setLocation(newLocation);
                await fetchLocationDetails(latitude, longitude);
                // 캐싱
                if (typeof window !== 'undefined') {
                  localStorage.setItem('location', JSON.stringify(newLocation));
                }
              }
            },
            (error) => {
              console.error('Geolocation error:', error.message);
              if (isMounted) {
                setLocation((prev) => ({ ...prev, error: error.message, loading: false }));
                fetchLocationFromIP();
              }
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
          );
        } else {
          if (isMounted) {
            setLocation((prev) => ({ ...prev, error: 'Geolocation is not supported by this browser.', loading: false }));
            fetchLocationFromIP();
          }
        }
      } catch (error) {
        console.error('Location fetch error:', error);
        if (isMounted) {
          setLocation((prev) => ({ ...prev, error: 'Failed to fetch location.', loading: false }));
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false; // 컴포넌트 언마운트 시 상태 업데이트 방지
    };
  }, []);

  const fetchLocationFromIP = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const { city, country_name: country, latitude, longitude } = response.data;
      const newLocation = { city, country, latitude, longitude, loading: false };
      setLocation(newLocation);
      // 캐싱
      if (typeof window !== 'undefined') {
        localStorage.setItem('location', JSON.stringify({ latitude, longitude }));
      }
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
      // 캐싱
      if (typeof window !== 'undefined') {
        localStorage.setItem('location', JSON.stringify({ latitude, longitude }));
      }
    } catch (error) {
      console.error('Reverse Geocode error:', error);
      setLocation((prev) => ({ ...prev, error: 'Failed to fetch location details.', loading: false }));
    }
  };

  return location;
}