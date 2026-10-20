"use client";

import React from "react";

export type ResizeDirection =
  | "n"
  | "s"
  | "e"
  | "w"
  | "nw"
  | "ne"
  | "sw"
  | "se";

interface ResizeHandlesProps {
  onStartResize: (e: React.MouseEvent, direction: ResizeDirection) => void;
  onStartDrag?: (e: React.MouseEvent) => void;
  accentColor?: string;
  width?: number;
  height?: number;
  isResizing?: boolean;
}

export function ResizeHandles({
  onStartResize,
  onStartDrag,
  accentColor = "#5003C0",
  width,
  height,
  isResizing = false,
}: ResizeHandlesProps) {
  return (
    <>
      {/* 4 DRAGGABLE BORDER STRIPS (Effortlessly move box by dragging any border edge) */}
      {/* Top Border Move Zone */}
      <div
        onMouseDown={onStartDrag}
        className="absolute -top-1.5 left-3 right-3 h-3 cursor-grab active:cursor-grabbing z-35 select-none hover:bg-filora/15 rounded-full transition-colors"
        title="Drag border to move box"
      />
      {/* Bottom Border Move Zone */}
      <div
        onMouseDown={onStartDrag}
        className="absolute -bottom-1.5 left-3 right-3 h-3 cursor-grab active:cursor-grabbing z-35 select-none hover:bg-filora/15 rounded-full transition-colors"
        title="Drag border to move box"
      />
      {/* Left Border Move Zone */}
      <div
        onMouseDown={onStartDrag}
        className="absolute -left-1.5 top-3 bottom-3 w-3 cursor-grab active:cursor-grabbing z-35 select-none hover:bg-filora/15 rounded-full transition-colors"
        title="Drag border to move box"
      />
      {/* Right Border Move Zone */}
      <div
        onMouseDown={onStartDrag}
        className="absolute -right-1.5 top-3 bottom-3 w-3 cursor-grab active:cursor-grabbing z-35 select-none hover:bg-filora/15 rounded-full transition-colors"
        title="Drag border to move box"
      />

      {/* 4 SIDE / EDGE RESIZE HANDLES (Top, Bottom, Left, Right) */}
      {/* Top Handle (North) */}
      <div
        onMouseDown={(e) => onStartResize(e, "n")}
        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-2 bg-white rounded-full shadow-xs cursor-ns-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none flex items-center justify-center group"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse top"
      >
        <div className="w-2 h-0.5 bg-neutral-300 rounded-full group-hover:bg-filora" />
      </div>

      {/* Bottom Handle (South) */}
      <div
        onMouseDown={(e) => onStartResize(e, "s")}
        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-2 bg-white rounded-full shadow-xs cursor-ns-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none flex items-center justify-center group"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse bottom"
      >
        <div className="w-2 h-0.5 bg-neutral-300 rounded-full group-hover:bg-filora" />
      </div>

      {/* Left Handle (West) */}
      <div
        onMouseDown={(e) => onStartResize(e, "w")}
        className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-5 bg-white rounded-full shadow-xs cursor-ew-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none flex items-center justify-center group"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse left"
      >
        <div className="w-0.5 h-2 bg-neutral-300 rounded-full group-hover:bg-filora" />
      </div>

      {/* Right Handle (East) */}
      <div
        onMouseDown={(e) => onStartResize(e, "e")}
        className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-5 bg-white rounded-full shadow-xs cursor-ew-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none flex items-center justify-center group"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse right"
      >
        <div className="w-0.5 h-2 bg-neutral-300 rounded-full group-hover:bg-filora" />
      </div>

      {/* 4 CORNER RESIZE HANDLES */}
      {/* Top-Left Handle (North-West) */}
      <div
        onMouseDown={(e) => onStartResize(e, "nw")}
        className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white rounded-xs shadow-xs cursor-nwse-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse top-left"
      />

      {/* Top-Right Handle (North-East) */}
      <div
        onMouseDown={(e) => onStartResize(e, "ne")}
        className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white rounded-xs shadow-xs cursor-nesw-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse top-right"
      />

      {/* Bottom-Left Handle (South-West) */}
      <div
        onMouseDown={(e) => onStartResize(e, "sw")}
        className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white rounded-xs shadow-xs cursor-nesw-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse bottom-left"
      />

      {/* Bottom-Right Handle (South-East) */}
      <div
        onMouseDown={(e) => onStartResize(e, "se")}
        className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white rounded-xs shadow-xs cursor-nwse-resize hover:scale-125 active:scale-95 transition-transform z-50 select-none"
        style={{ border: `1.5px solid ${accentColor}` }}
        title="Drag to expand or collapse bottom-right"
      />

      {/* Live Dimension Indicator while actively resizing */}
      {isResizing && width !== undefined && height !== undefined && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neutral-900/90 text-white rounded text-[10px] font-mono whitespace-nowrap shadow-md pointer-events-none z-50">
          {Math.round(width)} × {Math.round(height)} px
        </div>
      )}
    </>
  );
}
