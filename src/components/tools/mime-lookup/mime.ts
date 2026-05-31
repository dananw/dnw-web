export interface MimeEntry {
  ext: string;
  mime: string;
}

/** Common file extensions and their MIME types. */
export const MIME_TYPES: MimeEntry[] = [
  { ext: "txt", mime: "text/plain" },
  { ext: "html", mime: "text/html" },
  { ext: "css", mime: "text/css" },
  { ext: "csv", mime: "text/csv" },
  { ext: "js", mime: "text/javascript" },
  { ext: "mjs", mime: "text/javascript" },
  { ext: "json", mime: "application/json" },
  { ext: "xml", mime: "application/xml" },
  { ext: "pdf", mime: "application/pdf" },
  { ext: "zip", mime: "application/zip" },
  { ext: "gz", mime: "application/gzip" },
  { ext: "tar", mime: "application/x-tar" },
  { ext: "rar", mime: "application/vnd.rar" },
  { ext: "7z", mime: "application/x-7z-compressed" },
  { ext: "doc", mime: "application/msword" },
  { ext: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  { ext: "xls", mime: "application/vnd.ms-excel" },
  { ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
  { ext: "ppt", mime: "application/vnd.ms-powerpoint" },
  { ext: "pptx", mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
  { ext: "png", mime: "image/png" },
  { ext: "jpg", mime: "image/jpeg" },
  { ext: "jpeg", mime: "image/jpeg" },
  { ext: "gif", mime: "image/gif" },
  { ext: "webp", mime: "image/webp" },
  { ext: "avif", mime: "image/avif" },
  { ext: "svg", mime: "image/svg+xml" },
  { ext: "ico", mime: "image/vnd.microsoft.icon" },
  { ext: "bmp", mime: "image/bmp" },
  { ext: "tiff", mime: "image/tiff" },
  { ext: "mp3", mime: "audio/mpeg" },
  { ext: "wav", mime: "audio/wav" },
  { ext: "ogg", mime: "audio/ogg" },
  { ext: "weba", mime: "audio/webm" },
  { ext: "mp4", mime: "video/mp4" },
  { ext: "webm", mime: "video/webm" },
  { ext: "avi", mime: "video/x-msvideo" },
  { ext: "mov", mime: "video/quicktime" },
  { ext: "mkv", mime: "video/x-matroska" },
  { ext: "woff", mime: "font/woff" },
  { ext: "woff2", mime: "font/woff2" },
  { ext: "ttf", mime: "font/ttf" },
  { ext: "otf", mime: "font/otf" },
  { ext: "eot", mime: "application/vnd.ms-fontobject" },
  { ext: "wasm", mime: "application/wasm" },
  { ext: "md", mime: "text/markdown" },
  { ext: "yaml", mime: "application/yaml" },
  { ext: "yml", mime: "application/yaml" },
  { ext: "ics", mime: "text/calendar" },
  { ext: "bin", mime: "application/octet-stream" },
];

export function searchMime(query: string): MimeEntry[] {
  const q = query.trim().toLowerCase().replace(/^\./, "");
  if (!q) return MIME_TYPES;
  return MIME_TYPES.filter(
    (m) => m.ext.includes(q) || m.mime.toLowerCase().includes(q)
  );
}
