"use client";

/**
 * Safely read a cookie value from the browser. Returns null on the server.
 */
export function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.substring(name.length + 1)) : null;
}

export function getTokenFromDocumentCookie(): string | null {
  return getCookieValue("token");
}

