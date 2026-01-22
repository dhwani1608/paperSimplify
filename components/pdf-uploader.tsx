"use client";

import React from "react"

import { useCallback, useState } from "react";
import { Upload, FileText, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isScanned: boolean;
}

export function PDFUploader({
  onFileSelect,
  selectedFile,
  onClear,
  isScanned,
}: PDFUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type === "application/pdf") {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type === "application/pdf") {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  if (selectedFile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg border border-border">
          <FileText className="w-8 h-8 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {selectedFile.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <button
            onClick={onClear}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Remove file"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {isScanned && (
          <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-warning-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-warning-foreground">
                Scanned PDF Detected
              </p>
              <p className="text-sm text-warning-foreground/80">
                This PDF appears to be scanned. OCR will be used to extract
                text, which may reduce accuracy.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer",
        isDragOver
          ? "border-accent bg-accent/5"
          : "border-border hover:border-muted-foreground/50 hover:bg-secondary/50"
      )}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload PDF file"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <Upload className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">
            Drop your research paper here
          </p>
          <p className="text-muted-foreground mt-1">
            or click to browse (PDF only)
          </p>
        </div>
      </div>
    </div>
  );
}
