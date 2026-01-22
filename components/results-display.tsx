"use client";

import { Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultSection } from "./result-section";

export interface SimplifiedPaper {
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  keyContributions: string[];
  limitations: string[];
  summary: string;
}

interface ResultsDisplayProps {
  paper: SimplifiedPaper;
  onReset: () => void;
}

export function ResultsDisplay({ paper, onReset }: ResultsDisplayProps) {
  const handleDownloadMarkdown = () => {
    const markdown = `# Paper Summary

## Abstract (Simplified)
${paper.abstract}

## Introduction (Simplified)
${paper.introduction}

## Methodology (Explained)
${paper.methodology}

## Results & Findings
${paper.results}

## Key Contributions
${paper.keyContributions.map((c) => `- ${c}`).join("\n")}

## Limitations & Assumptions
${paper.limitations.map((l) => `- ${l}`).join("\n")}

## One-Page Summary
${paper.summary}
`;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "paper-summary.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground">
          Simplified Paper
        </h2>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Paper
          </Button>
          <Button onClick={handleDownloadMarkdown}>
            <Download className="w-4 h-4 mr-2" />
            Download Summary
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <ResultSection
          title="Abstract (Simplified)"
          content={paper.abstract}
          defaultOpen={true}
        />
        <ResultSection
          title="Introduction (Simplified)"
          content={paper.introduction}
        />
        <ResultSection
          title="Methodology (Explained in Plain English)"
          content={paper.methodology}
        />
        <ResultSection title="Results & Findings" content={paper.results} />
        <ResultSection
          title="Key Contributions"
          content={paper.keyContributions}
        />
        <ResultSection
          title="Limitations & Assumptions"
          content={paper.limitations}
        />
        <ResultSection
          title="One-Page Summary"
          content={paper.summary}
          defaultOpen={true}
        />
      </div>
    </div>
  );
}
