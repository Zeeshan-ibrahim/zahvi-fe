declare module "exifr" {
  export function parse(
    file: Blob,
    options?: Record<string, unknown>
  ): Promise<Record<string, any> | null>;
  export function gps(
    file: Blob
  ): Promise<{ latitude?: number; longitude?: number } | null>;
}

