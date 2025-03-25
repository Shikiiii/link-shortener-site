"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { metadata } from "./metadata";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  ExternalLink,
  Globe,
  BarChart3,
  Check,
  X,
  Loader2,
  Trash2,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

// User data (mock links => unpaginated links, no idea why i decided to use mock links when they are real links but not final)
let mockLinks: any[] = [];
let totalClicks: number;
let totalPages: number;

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [longUrl, setLongUrl] = useState("");
  const [customShortCode, setCustomShortCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showShortUrl, setShowShortUrl] = useState(false);
  const [newShortUrl, setNewShortUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [loading, setLoading] = useState(true); // To track the loading state
  interface UserData {
    data: {
      name: string;
      data: any[];
    };
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [paginatedLinks, setPaginatedLinks] = useState<Array<any> | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || !refreshToken) {
        window.location.href = "/profile/login";
        return;
      }

      try {
        const response = await fetch("/api/userinfo/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: accessToken }),
        });

        const data = await response.json();

        // Check if data indicates an expired token
        if (response.status === 401) {
          // Request a new access token using the refresh token
          const refreshResponse = await fetch("/api/refreshtoken/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          // if refresh token has also expired, redirect user to login page so they can reauthenticate themselves
          if (refreshResponse.status !== 200) {
            window.location.href = "/profile/login";
          }

          const refreshData = await refreshResponse.json();
          const newAccessToken = refreshData.data.access;

          // Save the new access token to local storage

          localStorage.setItem("accessToken", newAccessToken);

          // Retry fetching user data with the new access token
          const retryResponse = await fetch("/api/userinfo/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: newAccessToken }),
          });

          if (!retryResponse.ok) {
            throw new Error("Network response was not ok");
          }

          const retryData = await retryResponse.json();
          setUserData(retryData);
          // load mockLinks variable with the data links example format below:
          const loadedLinks = retryData.data.data.map((link: any) => ({
            id: link.id,
            originalUrl: link.original_url,
            shortCode: link.short_code,
            dateCreated: link.created_at,
            clicks: link.clicks,
          }));
          if (loadedLinks) {
            if (loadedLinks) {
              mockLinks.push(...loadedLinks);
            }
          }
          // Calculate total clicks
          totalClicks = mockLinks.reduce((sum, link) => sum + link.clicks, 0);

          // Calculate pagination
          totalPages = Math.ceil(mockLinks.length / itemsPerPage);
          const startIndex = (page - 1) * itemsPerPage;
          setPaginatedLinks(
            mockLinks.slice(startIndex, startIndex + itemsPerPage)
          );

          setLoading(false);
        } else {
          setUserData(data);

          // load mockLinks variable with the data links example format below:
          const loadedLinks = data.data.data.map((link: any) => ({
            id: link.id,
            originalUrl: link.original_url,
            shortCode: link.short_code,
            dateCreated: link.created_at,
            clicks: link.clicks,
          }));
          if (loadedLinks) {
            if (loadedLinks) {
              mockLinks.push(...loadedLinks);
            }
          }
          // Calculate total clicks
          totalClicks = mockLinks.reduce((sum, link) => sum + link.clicks, 0);

          // Calculate pagination
          totalPages = Math.ceil(mockLinks.length / itemsPerPage);
          console.log(totalPages)
          const startIndex = (page - 1) * itemsPerPage;
          setPaginatedLinks(
            mockLinks.slice(startIndex, startIndex + itemsPerPage)
          );
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Copy short URL to clipboard
  const copyToClipboard = (shortCode: string) => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/s/${shortCode}`);
    // Select Div with ID shortCode, find the first SVG, temporary hide it and replace it with a checkmark ✅ for a second, then revert
    const div = document.getElementById(shortCode);
    if (div) {
      const svg = div.querySelector("svg");
      if (svg) {
        const originalDisplay = svg.style.display;
        svg.style.display = "none";

        const span = div.querySelector("span");
        if (span) {
          span.style.display = "block";

          setTimeout(() => {
            svg.style.display = originalDisplay;
            span.style.display = "none";
          }, 1000);
        }
      }
    }
  };

  // delete URLs
  const deleteShortLink = async (shortCode: string) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/profile/login";
      return;
    }

    // tell the backend to do its job
    const response = await fetch("/api/deleteurl/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: accessToken,
        shortcode: shortCode,
      }),
    });

    // handle edge cases
    if (response.status !== 200) {
      alert("Something went wrong. Please try again later.");
      return;
    }

    // tell the user that it worked 🎉
    const yourLinksText = document.querySelector("#yourlinks");
    if (yourLinksText) {
      yourLinksText.innerHTML =
        'Your links <span style="color: #f87171; font-size: 0.875rem; font-weight: 500;">You have made changes. Refresh to see them.</span>';
    }
  };

  // logout method
  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/";
  };

  // Validate custom short code
  useEffect(() => {
    const validateShortCode = async () => {
      if (customShortCode.trim() === "") {
        setIsAvailable(null);
        return;
      }

      setIsValidating(true);

      // check if URL is available
      const response = await fetch("/api/checkavailability/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortCode: customShortCode.trim(),
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setIsAvailable(data.available);
        setIsValidating(false);
      } else {
        // something went wrong
        alert(
          "Something went wrong with checking your short code. Try again later."
        );
        setIsValidating(false);
        setIsAvailable(null);
      }
    };

    validateShortCode();
  }, [customShortCode]);

  const handleShortenClick = async () => {
    // generate short URL
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch("/api/shorten/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original_url: longUrl,
        custom_code: customShortCode,
        token: accessToken,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (response.status === 201) {
      const baseUrl = window.location.origin;
      setNewShortUrl(`${baseUrl}/s/${data.short_code}`);
      setShowShortUrl(true);

      // Reset form fields but keep the result visible
      setLongUrl("");
      setCustomShortCode("");
      setIsAvailable(null);
    } else {
      alert(
        "We are sorry. Something went wrong when creating your link. Try again later."
      );
      setLongUrl("");
      setCustomShortCode("");
      setIsAvailable(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${newShortUrl}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  // on page change:
  useEffect(() => {
    const loadedLinks = userData?.data.data.map((link: any) => ({
      id: link.id,
      originalUrl: link.original_url,
      shortCode: link.short_code,
      dateCreated: link.created_at,
      clicks: link.clicks,
    }));
    if (loadedLinks) {
      mockLinks = loadedLinks;
    }

    const startIndex = (page - 1) * itemsPerPage;
    const newPaginatedLinks = mockLinks.slice(
      startIndex,
      startIndex + itemsPerPage
    );
    setPaginatedLinks(newPaginatedLinks);
  }, [page, userData]);

  return (
    <div className="min-h-screen bg-primary">
      {/* Main content */}
      <main className="container mx-auto px-4 py-8 bg-primary">
        {/* Navigation */}
        <Header />

        {/* Greeting and stats */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              {loading ? (
                // Show skeleton loader while data is loading
                <div className="text-3xl font-bold mb-2 bg-gray-200 animate-pulse rounded-full h-16 w-48"></div>
              ) : (
                // Show the actual content when data is loaded
                <>
                  <h1 className="text-3xl font-bold mb-2">
                    Hello,{" "}
                    <span className="text-[#3366ff]">
                      {userData ? userData.data.name : "Unknown"}
                    </span>
                    !
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Welcome to your link management dashboard.
                  </p>
                </>
              )}
              <Button
                className="bg-gradient-to-r from-[#3366ff] to-[#00ccff] text-white"
                onClick={logOut}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Create new link */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Create a new short link</h2>
          {loading ? (
            <div className="space-y-4 w-[80%] h-40 bg-gray-200 animate-pulse"></div>
          ) : (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="longUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Long URL
                </label>
                <Input
                  id="longUrl"
                  placeholder="Paste your long URL here..."
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="w-full bg-white text-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="customUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Custom short URL (optional)
                </label>
                <div className="flex">
                  <div className="bg-gray-100 flex items-center px-3 border border-r-0 rounded-l-md text-gray-500">
                    {typeof window !== "undefined"
                      ? window.location.origin.split("://")[1] + "/s/"
                      : ""}
                  </div>
                  <div className="relative flex-1">
                    <Input
                      id="customUrl"
                      placeholder="Choose your own short URL"
                      value={customShortCode}
                      onChange={(e) => setCustomShortCode(e.target.value)}
                      className={`rounded-l-none w-full bg-white text-gray-400 ${
                        isAvailable === false
                          ? "border-red-500 focus-visible:ring-red-500"
                          : isAvailable === true
                          ? "border-green-500 focus-visible:ring-green-500"
                          : ""
                      }`}
                    />
                    {isValidating && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      </div>
                    )}
                    {!isValidating && isAvailable === true && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                    {!isValidating && isAvailable === false && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </div>
                </div>
                {isAvailable === false && (
                  <p className="mt-1 text-sm text-red-500">
                    This short URL is already taken. Please choose another one.
                  </p>
                )}
                {isAvailable === true && (
                  <p className="mt-1 text-sm text-green-500">
                    This short URL is available!
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  className="bg-gradient-to-r from-[#3366ff] to-[#00ccff] text-white w-full sm:w-auto"
                  disabled={
                    longUrl.trim() === "" ||
                    (customShortCode.trim() !== "" && isAvailable !== true)
                  }
                  onClick={handleShortenClick}
                >
                  Shorten it!
                </Button>

                {showShortUrl && (
                  <div className="mt-4 bg-white p-4 rounded-lg border">
                    <p className="font-medium mb-2">Your shortened link:</p>
                    <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                      <Link
                        href={`${newShortUrl}`}
                        className="text-[#3366ff] hover:underline truncate"
                        target="_blank"
                      >
                        {newShortUrl}
                      </Link>
                      <Button
                        variant="ghost"
                        className="shrink-0 text-[#3366ff] hover:text-[#3366ff] hover:bg-blue-50"
                        onClick={handleCopy}
                      >
                        {copySuccess ? <Check className="h-4 w-4" /> : "Copy"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Total clicks card */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center gap-4">
            <BarChart3 className="h-12 w-12 text-[#3366ff]" />
            <div>
              <p className="text-gray-500 text-sm">
                Total clicks on your links
              </p>
              {loading ? (
                <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-full"></div>
              ) : (
                <h2 className="text-4xl font-bold text-[#3366ff]">
                  {totalClicks.toLocaleString()}
                </h2>
              )}
            </div>
          </div>
        </div>

        {/* Links table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" id="yourlinks">
            Your links
          </h2>

          {loading ? (
            <div className="overflow-x-auto w-[80%] h-80 bg-gray-200 animate-pulse"></div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Short URL</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Original URL
                    </TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Created
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLinks?.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-[#3366ff]" />
                          <span>{link.shortCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate hidden md:table-cell">
                        {link.originalUrl}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          {link.clicks.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {new Date(link.dateCreated).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2" id={link.shortCode}>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(link.shortCode)}
                            title="Copy short URL"
                          >
                            <Copy className="h-4 w-4" />
                            <span style={{ display: "none" }}>✅</span>
                            <span className="sr-only">Copy</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                            title="Visit URL"
                          >
                            <a
                              href={
                                window.location.origin + "/s/" + link.shortCode
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span className="sr-only">Visit</span>
                            </a>
                          </Button>
                          <Button // 🗑️
                            variant="outline"
                            size="icon"
                            title="Delete URL"
                            onClick={() => deleteShortLink(link.shortCode)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Pagination */}
          {loading ? (
            <div className="mt-4 flex justify-center">
              <div className="w-60 h-10 bg-gray-200 animate-pulse"></div>
            </div>
          ) : (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={`${
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "pointer-events-auto cursor-pointer hover:underline"
                      }`}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem
                      key={i}
                      className={`${
                        i >= 2 && i < totalPages - 1
                          ? "hidden sm:inline-flex"
                          : ""
                      } ${
                        page === i + 1
                          ? "pointer-events-none"
                          : "pointer-events-auto cursor-pointer hover:underline"
                      }`}
                    >
                      {i === 1 && totalPages > 3 && page > 2 ? (
                        <PaginationEllipsis />
                      ) : i === totalPages - 2 &&
                        totalPages > 3 &&
                        page < totalPages - 1 ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          isActive={page === i + 1}
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "pointer-events-auto cursor-pointer hover:underline"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>

      <div className="pb-5">
        <Footer />
      </div>
    </div>
  );
}
