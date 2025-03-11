'use client';

import { useState, useEffect } from 'react';

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodingResponse {
  status: string;
  results: {
    address_components: AddressComponent[];
  }[];
}

interface FooterProps {
  texts: {
    copyright: string;
    locationNotSupported: string;
    apiKeyMissing: string;
    countryNotFound: string;
    locationNotFound: string;
    fetchingLocation: string;
    failedToGetLocation: string;
    unknownError: string;
  };
}

export default function Footer({ texts }: FooterProps) {
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      if (!navigator.geolocation) {
        setError(texts.locationNotSupported);
        return;
      }

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        if (!apiKey) {
          setError(texts.apiKeyMissing);
          return;
        }

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
        );
        const data = await response.json() as GeocodingResponse;

        if (data.status === 'OK' && data.results.length > 0) {
          const addressComponents = data.results[0].address_components;
          const country = addressComponents.find((component) => 
            component.types.includes('country')
          );

          if (country) {
            setLocation(country.long_name);
          } else {
            setError(texts.countryNotFound);
          }
        } else {
          setError(texts.locationNotFound);
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : texts.unknownError;
        setError(texts.failedToGetLocation + errorMessage);
      }
    };

    getLocation();
  }, [texts]);

  return (
    <footer className="w-full py-4 text-gray-300 flex items-center justify-between pr-10">
      <span>{texts.copyright}</span>
      <span className="text-gray-300">
        {error ? error : location ? `Location: ${location}` : texts.fetchingLocation}
      </span>
    </footer>
  );
}