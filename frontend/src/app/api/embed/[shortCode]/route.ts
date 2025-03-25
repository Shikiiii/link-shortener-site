import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { shortCode: string } }) {
  const shortCode = params.shortCode;
  if (!shortCode) {
    return NextResponse.json({ error: "Short code missing" }, { status: 400 });
  }

  // Fetch the original URL from your backend API
  const response = await fetch(`/api/resolve/${shortCode}`);
  if (!response.ok) {
    return NextResponse.json({ error: "Short URL not found" }, { status: 404 });
  }

  const data = await response.json();
  const originalUrl = data.originalUrl;

  // Fetch metadata from the original URL
  const siteMetadata = await fetch(originalUrl)
    .then((res) => res.text())
    .then((html) => {
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : "Shortened Link";
      return { title, url: originalUrl };
    })
    .catch(() => ({ title: "Shortened Link", url: originalUrl }));

  // Serve metadata but NO auto-redirect
  return new Response(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta property="og:title" content="${siteMetadata.title}" />
      <meta property="og:description" content="This is a shortened link leading to ${siteMetadata.url}" />
      <meta property="og:url" content="${siteMetadata.url}" />
      <meta name="twitter:card" content="summary_large_image" />
      <title>Redirecting...</title>
    </head>
    <body>
      <script>
        window.location.href = "/s/${shortCode}"; // This redirects users back to the Next.js page
      </script>
    </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
