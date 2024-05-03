'use client'

import { useEffect, useState } from "react";
import { IsAuthenticated } from "@/Security/IsAuthenticated";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      console.log('Attempting auth')
      if (!(await IsAuthenticated())) {
        console.log('push attempt');
        router.push('/LogIn'); // Redirect to login page if not authenticated
      } else {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prevValue) => {
        if (prevValue < 90) {
          return prevValue + 10;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 10); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return { loading, progressValue };
};