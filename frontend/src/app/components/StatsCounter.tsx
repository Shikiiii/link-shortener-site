"use client";

interface StatsCounterProps {
  label: string;
}

const getNumbers = async (label: string) => {
  const cookieName = 'homepage_stats';
  const cookie = document.cookie.split('; ').find(row => row.startsWith(cookieName));
  
  if (cookie) {
    const cookieValue = cookie.split('=')[1];
    const decodedValue = JSON.parse(atob(cookieValue));
    
    const expirationDate = new Date(decodedValue.expiration);
    if (expirationDate > new Date()) {
      return decodedValue[label];
    } else {
      const data = await fetchData(cookieName);
      
      return data[label];
    }
  } else {
    const data = await fetchData(cookieName);
      
    return data[label];
  }
}

const fetchData = async (cookieName: string) => {
    // get API response from /api/getstats
    const response = await fetch('/api/getstats');
    const data = await response.json();
    
    // build a cookie from it, set expiration date to 12 hours, base64 encode it
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 12);
    const cookieValue = btoa(JSON.stringify({ ...data, expiration: expirationDate.toISOString() }));
    
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;

    return data;
}

import { useEffect, useState } from 'react';

const StatsCounter = ({ label }: StatsCounterProps) => {
  const [number, setNumber] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getNumbers(label);
      setNumber(result);
    };

    fetchData();
  }, [label]);

  return (
    <div className="flex flex-col items-center mx-8">
      <div className="text-center">
        <p className="text-3xl font-medium">Over</p>
        <p className="text-9xl font-bold text-blue-600">{number !== null ? number : '0'}</p>
        <p className="text-3xl font-medium pb-10">{label}</p>
      </div>
    </div>
  );
};

export default StatsCounter;
