"use client";

import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function downloadFilesAsZip(
  files: { filename: string; data: Uint8Array | Blob | string }[],
  zipFilename = "filora_export.zip"
): Promise<void> {
  const zip = new JSZip();

  for (const file of files) {
    if (typeof file.data === "string" && file.data.startsWith("data:")) {
      // Data URL
      const base64 = file.data.split(",")[1];
      zip.file(file.filename, base64, { base64: true });
    } else {
      zip.file(file.filename, file.data);
    }
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, zipFilename);
}

export function downloadBlob(blob: Blob | Uint8Array, filename: string): void {
  const fileBlob = blob instanceof Blob ? blob : new Blob([blob as any], { type: "application/pdf" });
  saveAs(fileBlob, filename);
}
