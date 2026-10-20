import { AdSlot } from "./AdSlot";

export function TopContentAd({ className = "" }: { className?: string }) {
  return <AdSlot format="horizontal" slotId="top-content-ad" className={`my-4 ${className}`} />;
}

export function InContentAd({ className = "" }: { className?: string }) {
  return <AdSlot format="horizontal" slotId="in-content-ad" className={`my-8 ${className}`} />;
}

export function SidebarAd({ className = "" }: { className?: string }) {
  return <AdSlot format="rectangle" slotId="sidebar-ad" className={`my-4 ${className}`} />;
}

export function BottomContentAd({ className = "" }: { className?: string }) {
  return <AdSlot format="horizontal" slotId="bottom-content-ad" className={`my-8 ${className}`} />;
}
