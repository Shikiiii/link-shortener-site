"use client";

import { useState } from "react";

export default function LinkShortenerForm() {
  const [url, setUrl] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortCode, setShortCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original_url: url }),
      });

      const data = await response.json();
      console.log("Shortened URL data:", data);

      if (response.ok) {
        // build the short URL
        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/s/${data.shortUrl}/`;
        setShortenedUrl(shortUrl);
        setShortCode(data.shortUrl);
      } else {
        console.error("Error encountered when shortening URL: ", data.message);
      }
    } catch (error) {
      console.log("Error shortening URL: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-full md:max-w-md mx-auto px-0 md:px-4 absolute w-11/12 md:relative md:w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md">
            <input
              type="url"
              placeholder="Simply paste your link here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 bg-white text-black rounded-md focus:outline-none text-primary-text"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white w-full px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-md font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Shorten it!"}
          </button>
        </form>

        {shortenedUrl && (
          <div className="mt-6 p-4 bg-white rounded-md w-full">
            <p className="font-medium">Your shortened link: </p>
            <div className="flex justify-between items-center mt-2">
              <a
                href={"/s/" + shortCode}
                className="text-blue-600 underline break-all max-w-[75%]"
              >
                {shortenedUrl}
              </a>
              <button
                onClick={(e) => {
                  navigator.clipboard.writeText(shortenedUrl);
                  const button = e.currentTarget;
                  const originalText = button.textContent;
                  button.textContent = "✅";
                  setTimeout(() => {
                    button.textContent = originalText;
                  }, 1000);
                }}
                className="ml-2 p-2 bg-gray-100 rounded-md text-thirdly-text"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
