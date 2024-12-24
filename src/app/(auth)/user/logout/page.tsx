"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('type');

    // Redirect to login or homepage after logout
    router.push('/user/login'); // Redirect to login page or any other page
  }, []);

  return null; // Since this is just for logout, no UI needed
};

export default Logout;
