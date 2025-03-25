"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage({
  params,
}: {
  params: { shortCode: string };
}) {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdownText, setCountdownText] =
    useState<string>("Redirecting you...");
  const router = useRouter();

  useEffect(() => {
    if (!params.shortCode) return;

    async function fetchOriginalUrl() {
      try {
        const response = await fetch(`/api/resolve/${params.shortCode}`);

        if (!response.ok) {
          setError("Link not found or has expired");
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setOriginalUrl(data.originalUrl);
        setIsLoading(false);

        startCountdown(data.originalUrl);
      } catch (error) {
        console.error("Error fetching original URL:", error);
        setError("An error occurred. Please try again later.");
        setIsLoading(false);
      }
    }

    function startCountdown(url: string) {
      let countdownSeconds = 6;
      const domainExtractor = url.split("://")[1].split("/")[0].split(".");
      let domainName = domainExtractor.slice(-2).join(".");

      const intervalId = setInterval(() => {
        countdownSeconds -= 1;
        setCountdownText(
          `Redirecting you to <b>${domainName}</b> in <b>${countdownSeconds}</b> seconds...`
        );

        if (countdownSeconds <= 0) {
          clearInterval(intervalId);
          window.location.href = url;
        }
      }, 1000);
    }

    fetchOriginalUrl();
  }, [params]);

  return (
    <div className="flex min-h-screen bg-sky-200 flex-col items-center justify-center">
      <h1 className="text-xl font-bold mb-4">Link shortener app</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {isLoading ? (
          <h1
            className="text-xl font-bold"
            dangerouslySetInnerHTML={{ __html: countdownText }}
          />
        ) : error ? (
          <h1 className="text-xl font-bold text-red-500">{error}</h1>
        ) : originalUrl ? (
          <>
            <h1
              className="text-xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: countdownText }}
            />
            <p className="mb-4">
              If you are not redirected automatically, click the link below:
            </p>
            <a href={originalUrl} className="text-blue-600 underline break-all">
              {originalUrl}
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
}
