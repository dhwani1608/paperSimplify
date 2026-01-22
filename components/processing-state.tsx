"use client";

import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";

export type ProcessingStep =
  | "uploading"
  | "extracting"
  | "simplifying"
  | "finalizing"
  | "complete";

interface ProcessingStateProps {
  currentStep: ProcessingStep;
}

const steps: { key: ProcessingStep; label: string }[] = [
  { key: "uploading", label: "Uploading" },
  { key: "extracting", label: "Extracting text" },
  { key: "simplifying", label: "Simplifying" },
  { key: "finalizing", label: "Finalizing" },
];

export function ProcessingState({ currentStep }: ProcessingStateProps) {
  const currentIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex || currentStep === "complete";
          const isCurrent = step.key === currentStep && currentStep !== "complete";

          return (
            <div key={step.key} className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isComplete
                    ? "bg-accent text-accent-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "font-medium transition-colors",
                  isComplete || isCurrent
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
