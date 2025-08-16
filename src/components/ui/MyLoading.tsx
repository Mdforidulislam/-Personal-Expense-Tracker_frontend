"use client";
import Lottie from "lottie-react";
import blogLoading from "@/assets/BlogLoading.json";
import { useEffect, useState } from "react";

const MyLoading = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  
  return (
    <div className="h-full w-full flex justify-center items-center">
      {isClient && (
        <Lottie className="h-96 pt-5" animationData={blogLoading} loop={true} />
      )}
    </div>
  );
};

export default MyLoading;
