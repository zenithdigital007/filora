"use client";

import { 
  MousePointer, 
  Type, 
  FileText,
  Eraser,
  Image as ImageIcon, 
  PenTool, 
  Highlighter, 
  Square, 
  StickyNote, 
  Stamp, 
  FileSignature, 
  ShieldAlert, 
  LucideIcon 
} from "lucide-react";

export type EditorTool = 
  | "select"
  | "edit_text"
  | "eraser"
  | "text"
  | "image"
  | "draw"
  | "highlight"
  | "shape"
  | "note"
  | "stamp"
  | "signature"
  | "watermark";

interface EditorSidebarProps {
  activeTool: EditorTool;
  onSelectTool: (tool: EditorTool) => void;
}

export function EditorSidebar({ activeTool, onSelectTool }: EditorSidebarProps) {
  const tools: { id: EditorTool; label: string; icon: LucideIcon; badge?: string }[] = [
    { id: "select", label: "Select Objects (V)", icon: MousePointer },
    { id: "edit_text", label: "Edit Original PDF Text (E)", icon: FileText, badge: "AI" },
    { id: "eraser", label: "Eraser / Delete Content (X)", icon: Eraser },
    { id: "text", label: "Add New Text (T)", icon: Type },
    { id: "draw", label: "Freehand Pen (P)", icon: PenTool },
    { id: "highlight", label: "Highlighter (H)", icon: Highlighter },
    { id: "shape", label: "Shapes & Boxes", icon: Square },
    { id: "signature", label: "Signature (S)", icon: FileSignature },
    { id: "stamp", label: "Stamp Label", icon: Stamp },
    { id: "note", label: "Sticky Note", icon: StickyNote },
    { id: "image", label: "Insert Image", icon: ImageIcon },
    { id: "watermark", label: "Watermark", icon: ShieldAlert },
  ];

  return (
    <aside className="w-14 sm:w-16 bg-white border-r border-neutral-200 flex flex-col items-center py-3 gap-1.5 shrink-0 z-20 select-none overflow-y-auto">
      {tools.map((item) => {
        const Icon = item.icon;
        const isActive = activeTool === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTool(item.id)}
            title={item.label}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isActive
                ? "bg-filora-50 text-filora border border-filora-200 shadow-xs scale-105 font-bold"
                : "text-neutral-500 hover:text-neutral-900 hover:bg-surface-subtle"
            }`}
          >
            <Icon className="w-5 h-5" />
            {item.badge && (
              <span className="absolute -top-1 -right-1 px-1 py-0.2 text-[8px] font-black bg-filora text-white rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
}
