'use client';

import { useGeolocation } from '@/hooks/useGeolocation';

export default function LocationDisplay() {
  const location = useGeolocation();

  return (
    <>
      {location.loading && <p className="text-sm text-gray-500 ml-4">위치 정보를 가져오는 중...</p>}
      {location.city && !location.error && !location.loading && (
        <p className="text-sm text-gray-500 ml-4">현재 위치: {location.city}, {location.country}</p>
      )}
      {location.error && !location.loading && (
        <p className="text-sm text-red-500 ml-4">위치정보를 가져올 수 없습니다: {location.error}</p>
      )}
    </>
  );
} 