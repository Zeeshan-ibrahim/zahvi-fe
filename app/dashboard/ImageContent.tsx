"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

type ImageMeta = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  width: number | null;
  height: number | null;
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  make: string | null;
  model: string | null;
  lensModel: string | null;
  takenAt: string | null;
  focalLength: number | null;
  iso: number | null;
  exposureTime: number | null;
  aperture: number | null;
};

export const ImageContent = () => {
  const [images, setImages] = useState<ImageMeta[]>([]);

  const readDimensions = (file: File) =>
    new Promise<{ width: number | null; height: number | null }>((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        resolve({
          width: img.naturalWidth || null,
          height: img.naturalHeight || null,
        });
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        resolve({ width: null, height: null });
        URL.revokeObjectURL(url);
      };

      img.src = url;
    });

  const readImageMeta = async (file: File): Promise<ImageMeta> => {
    const [dims, exif] = await Promise.all([
      readDimensions(file),
      (async () => {
        try {
          const exifr = await import("exifr");
          return await exifr.parse(file, { gps: true });
        } catch (err) {
          console.warn("Could not read EXIF data", err);
          return null;
        }
      })(),
    ]);

    return {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      width: dims.width,
      height: dims.height,
      latitude: (exif as any)?.latitude ?? null,
      longitude: (exif as any)?.longitude ?? null,
      altitude: (exif as any)?.altitude ?? null,
      make: (exif as any)?.Make ?? (exif as any)?.make ?? null,
      model: (exif as any)?.Model ?? (exif as any)?.model ?? null,
      lensModel: (exif as any)?.LensModel ?? null,
      takenAt: (exif as any)?.DateTimeOriginal ?? null,
      focalLength: (exif as any)?.FocalLength ?? null,
      iso: (exif as any)?.ISO ?? null,
      exposureTime: (exif as any)?.ExposureTime ?? null,
      aperture: (exif as any)?.FNumber ?? null,
    };
  };

  const handleFiles = async (files: File[]) => {
    if (!files.length) return;

    const metas = await Promise.all(files.map(readImageMeta));
    setImages(metas);
    console.log("Selected images metadata", metas);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: handleFiles,
  });

  return (
    <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-slate-900/60 p-6 text-white shadow-lg shadow-slate-950/40">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Upload images</h2>
          <p className="text-sm text-slate-400">
            Drag and drop or pick multiple images to view their metadata.
          </p>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
          isDragActive
            ? "border-purple-400 bg-purple-500/10 text-purple-100"
            : "border-white/15 bg-slate-950/40 text-slate-200 hover:border-white/25 hover:bg-slate-900/60"
        }`}
      >
        <input {...getInputProps()} />
        <span className="text-sm font-medium">
          {isDragActive ? "Drop the files here..." : "Drop images here or click to browse"}
        </span>
        <span className="text-xs text-slate-400">PNG, JPG, GIF, WebP … (multiple allowed)</span>
      </div>

      {images.length > 0 ? (
        <div className="mt-6 space-y-3">
          {images.map((img) => (
            <div
              key={`${img.name}-${img.lastModified}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/70 px-4 py-3 text-sm"
            >
              <div className="flex min-w-0 flex-col">
                <span className="font-medium text-slate-100">{img.name}</span>
                <span className="text-slate-400">{img.type || "unknown"}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-slate-300">
                <span>{(img.size / 1024).toFixed(1)} KB</span>
                <span className="text-slate-500">•</span>
                <span>
                  {img.width && img.height
                    ? `${img.width} × ${img.height}px`
                    : "dimensions unavailable"}
                </span>
                {(img.latitude !== null || img.longitude !== null) && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span>
                      GPS:{" "}
                      {img.latitude !== null && img.longitude !== null
                        ? `${img.latitude.toFixed(5)}, ${img.longitude.toFixed(5)}`
                        : "unavailable"}
                    </span>
                  </>
                )}
                {(img.make || img.model) && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="truncate">
                      {img.make} {img.model}
                    </span>
                  </>
                )}
                {(img.focalLength || img.iso || img.exposureTime || img.aperture) && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span className="flex flex-wrap items-center gap-2 text-slate-300">
                      {img.focalLength && <span>{img.focalLength}mm</span>}
                      {img.aperture && <span>ƒ/{img.aperture}</span>}
                      {img.exposureTime && (
                        <span>
                          {img.exposureTime < 1
                            ? `1/${Math.round(1 / img.exposureTime)}s`
                            : `${img.exposureTime}s`}
                        </span>
                      )}
                      {img.iso && <span>ISO {img.iso}</span>}
                    </span>
                  </>
                )}
                {img.lensModel && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span>Lens: {img.lensModel}</span>
                  </>
                )}
                {img.takenAt && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span>Taken: {img.takenAt}</span>
                  </>
                )}
                {img.altitude !== null && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span>Alt: {img.altitude.toFixed(1)}m</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-slate-400">
          No images selected yet.
        </p>
      )}
    </div>
  );
};