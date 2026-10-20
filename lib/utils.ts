import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function truncateFilename(name: string, maxLen = 24) {
  if (name.length <= maxLen) return name;
  const extIndex = name.lastIndexOf(".");
  if (extIndex === -1) return name.slice(0, maxLen - 3) + "...";
  const ext = name.slice(extIndex);
  const base = name.slice(0, extIndex);
  return base.slice(0, maxLen - ext.length - 3) + "..." + ext;
}
