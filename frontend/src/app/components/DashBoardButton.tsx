"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push("/profile/dashboard");
    } else {
      router.push("/profile/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-sm md:text-xl bg-white rounded-md px-4 py-2 font-medium text-blue-500"
    >
      Dashboard
    </button>
  );
};

export default DashboardButton;
