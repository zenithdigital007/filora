import { NextResponse } from "next/server";
import { getAdSenseClientId } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId = getAdSenseClientId();
  
  // Format: "pub-XXXXXXXXXXXXXXXX" (strips leading "ca-" if present)
  let pubId = "pub-XXXXXXXXXXXXXXXX";
  if (clientId) {
    pubId = clientId.startsWith("ca-") ? clientId.slice(3) : clientId;
  }

  const content = `# Google AdSense ads.txt for pdfyara.com
# Reference: https://support.google.com/adsense/answer/7532444
google.com, ${pubId}, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
