# 📄 PaperSimplify

**PaperSimplify** is a lightweight web application that helps students and researchers understand academic papers faster by converting dense research PDFs into **clear, section-wise simplified explanations** using AI.

It supports both **text-based PDFs** and **scanned PDFs (via OCR)**, and presents results in a structured, easy-to-read format.

🔗 Live Demo: https://paper-simplify.vercel.app/ 

---

## 🚀 Features

- 📥 Upload academic research PDFs
- 🧠 AI-powered simplification of complex sections
- 📑 Automatic section extraction:
  - Abstract
  - Introduction
  - Methodology
  - Results
  - Conclusion
- 🎓 **“Explain Like I’m 15” mode** for beginner-friendly explanations
- 📝 One-page summary generation
- ⭐ Key contributions & ⚠️ limitations extraction
- 📸 **OCR support for scanned PDFs using PDF.co API**
- ⚡ End-to-end processing in seconds

---

## 🧠 Why PaperSimplify?

Research papers are:
- Dense
- Jargon-heavy
- Time-consuming to read

PaperSimplify focuses on **understanding**, not just summarization — helping users quickly grasp:
- What the paper is about
- How it works
- Why it matters
- Where it falls short

---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| AI | OpenAI GPT models |
| OCR | **PDF.co OCR API** |
| PDF Parsing | pdf-parse |
| Deployment | Vercel |

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn
- OpenAI API key
- PDF.co API key

---

### Installation

```bash
git clone https://github.com/dhwani1608/paperSimplify.git
cd paperSimplify
npm install

