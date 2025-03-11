'use client';

import { useState, useEffect } from 'react';

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export default function Footer() {
    const [location, setLocation] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLocation = async () => {
            if (!navigator.geolocation) {
                setError('Geolocation is not supported by your browser.');
                return;
            }

            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });

                const { latitude, longitude } = position.coords;

                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'YOUR_API_KEY';
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
                );
                const data = await response.json();

                if (data.status === 'OK' && data.results.length > 0) {
                    const addressComponents = data.results[0].address_components as AddressComponent[];
                    const country = addressComponents.find((component) => 
                        component.types.includes('country')
                    );
                    
                    if (country) {
                        setLocation(country.long_name);
                    } else {
                        setError('국가 정보를 찾을 수 없습니다.');
                    }
                } else {
                    setError('위치 정보를 가져올 수 없습니다.');
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
                setError('위치 정보 가져오기 실패: ' + errorMessage);
            }
        };

        getLocation();
    }, []);

    return (
        <footer className="w-full py-4 text-gray-300 flex items-center justify-between pr-10">
            <span>© 2025 Jump. All rights reserved.</span>
            <span className="text-gray-300">
                {error ? error : location ? `Location: ${location}` : '위치 정보 가져오는 중...'}
            </span>
        </footer>
    );
}