import { NextResponse } from "next/server";
import { getAdSenseClientId } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId = getAdSenseClientId();
  
  // Format: "pub-XXXXXXXXXXXXXXXX" (strips leading "ca-" if present)
  let pubId = "pub-4543066948758573";
  if (clientId) {
    pubId = clientId.startsWith("ca-") ? clientId.slice(3) : clientId;
  }

  const content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
