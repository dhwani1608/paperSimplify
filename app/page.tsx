"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PDFUploader } from "@/components/pdf-uploader";
import {
  ProcessingState,
  type ProcessingStep,
} from "@/components/processing-state";
import {
  ResultsDisplay,
  type SimplifiedPaper,
} from "@/components/results-display";

type AppState = "upload" | "processing" | "results";

export default function PaperSimplify() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [eli15Mode, setEli15Mode] = useState(false);
  const [processingStep, setProcessingStep] =
    useState<ProcessingStep>("uploading");
  const [result, setResult] = useState<SimplifiedPaper | null>(null);
  const [isScanned, setIsScanned] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setIsScanned(false);
    setError(null);
  };

  const handleReset = () => {
    setAppState("upload");
    setSelectedFile(null);
    setResult(null);
    setProcessingStep("uploading");
    setIsScanned(false);
    setError(null);
  };

  const simulateProgress = async () => {
    const steps: ProcessingStep[] = [
      "uploading",
      "extracting",
      "simplifying",
      "finalizing",
    ];

    for (const step of steps) {
      setProcessingStep(step);
      await new Promise((resolve) =>
        setTimeout(resolve, step === "simplifying" ? 2000 : 800)
      );
    }
  };

  const handleSimplify = async () => {
    if (!selectedFile) return;

    setAppState("processing");
    setError(null);

    try {
      // Start progress simulation
      const progressPromise = simulateProgress();

      // Make the actual API call
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("simplifyLevel", eli15Mode ? "eli15" : "standard");

      const response = await fetch("/api/simplify", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the paper");
      }

      const data = await response.json();

      // Wait for progress animation to complete
      await progressPromise;

      setProcessingStep("complete");
      setIsScanned(data.isScanned || false);

      // Small delay before showing results
      await new Promise((resolve) => setTimeout(resolve, 500));

      setResult({
        abstract: data.abstract,
        introduction: data.introduction,
        methodology: data.methodology,
        results: data.results,
        keyContributions: data.keyContributions,
        limitations: data.limitations,
        summary: data.summary,
      });

      setAppState("results");
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
      setAppState("upload");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">PaperSimplify</h1>
            <p className="text-sm text-muted-foreground">
              Understand research faster
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {appState === "upload" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Turn complex papers into clear insights
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Upload any academic paper and get a simplified breakdown of its
                key sections, methodology, and findings.
              </p>
            </div>

            {/* Upload Section */}
            <div className="space-y-6">
              <PDFUploader
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onClear={handleClearFile}
                isScanned={isScanned}
              />

              {selectedFile && (
                <div className="space-y-6">
                  {/* ELI15 Toggle */}
                  <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                    <div className="space-y-1">
                      <Label
                        htmlFor="eli15"
                        className="text-sm font-medium text-card-foreground cursor-pointer"
                      >
                        Explain like I'm 15
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Use simpler language and more analogies
                      </p>
                    </div>
                    <Switch
                      id="eli15"
                      checked={eli15Mode}
                      onCheckedChange={setEli15Mode}
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    onClick={handleSimplify}
                    size="lg"
                    className="w-full text-base"
                  >
                    Simplify Paper
                  </Button>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-border">
              {[
                {
                  title: "Plain English",
                  description:
                    "Complex jargon translated into everyday language",
                },
                {
                  title: "Key Insights",
                  description:
                    "Important findings and contributions highlighted",
                },
                {
                  title: "Quick Summary",
                  description: "One-page overview for fast understanding",
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center p-4">
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {appState === "processing" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Processing your paper
            </h2>
            <p className="text-muted-foreground">
              This may take a moment depending on the paper length
            </p>
            <ProcessingState currentStep={processingStep} />
          </div>
        )}

        {appState === "results" && result && (
          <ResultsDisplay paper={result} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Built to help students and researchers understand complex papers
            faster
          </p>
        </div>
      </footer>
    </div>
  );
}
