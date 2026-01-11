"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ImageContent } from "./ImageContent";
import { SingleImageModal } from "./singleImageModal";

export const NavBar = () => {
  const [imageModal, setImageModal] = useState(false);

  const handleUploadClick = () => {
    setImageModal(true);
  };

  const handleCloseModal = () => {
    setImageModal(false);
  };

  const handleNotificationClick = () => {
    // TODO: Show notifications
    console.log("Notification icon clicked");
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && imageModal) {
        handleCloseModal();
      }
    };

    if (imageModal) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [imageModal]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex w-full items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/10">
        {/* Left side - Logo/Name */}
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-black">
            ZaHvi
          </h1>
        </div>

        {/* Right side - Notifications and Upload */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <button
            onClick={handleNotificationClick}
            className="relative flex items-center justify-center rounded-full p-2 text-slate-300 transition hover:bg-white/5 hover:text-slate-100"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {/* Optional notification badge */}
            {/* <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-purple-500"></span> */}
          </button>

          {/* Upload Button */}
          <Button
            onClick={handleUploadClick}
            className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/40 transition hover:scale-105 hover:bg-purple-400 hover:shadow-purple-400/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload Images
          </Button>
        </div>
      </nav>

      {/* Modal Overlay */}
      {imageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl border border-white/10 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 z-10 flex items-center justify-center rounded-full bg-slate-800/80 p-2 text-slate-300 transition hover:bg-slate-700 hover:text-white"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* ImageContent Component */}
            {/* multiple images component can be added here - check file : ImageContent */}
            <SingleImageModal />
           
          </div>
        </div>
      )}
    </>
  );
};