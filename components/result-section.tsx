"use client";

import { useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultSectionProps {
  title: string;
  content: string | string[];
  defaultOpen?: boolean;
}

export function ResultSection({
  title,
  content,
  defaultOpen = false,
}: ResultSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  const textContent = Array.isArray(content) ? content.join("\n") : content;
  const displayContent = Array.isArray(content) ? content : [content];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
      >
        <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 border-t border-border">
            <div className="flex justify-end mb-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {Array.isArray(content) ? (
              <ul className="space-y-2 text-card-foreground leading-relaxed">
                {displayContent.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-1.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">
                {content}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
