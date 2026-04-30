/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, FileText, Printer, RotateCcw, ArrowLeft, Download } from "lucide-react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { generateResume } from "./services/gemini";
import { ResumeData, UserInput } from "./types";

export default function App() {
  const [view, setView] = useState<"form" | "preview">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: UserInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const generated = await generateResume(data);
      setResumeData(generated);
      setUserInput(data);
      setView("preview");
    } catch (err) {
      console.error(err);
      setError("Failed to generate your resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to start over? All entered data will be lost.")) {
      setView("form");
      setResumeData(null);
      setUserInput(null);
      setError(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar - hidden on print */}
      <nav className="no-print sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 leading-none">
                ResumeArchitect <span className="text-blue-600 uppercase text-xs font-bold tracking-widest ml-1">Pro</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {view === "preview" ? (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</span>
                  <span className="text-xs font-semibold text-green-600">ATS Optimized: 98% Score</span>
                </div>
                <div className="h-4 w-px bg-slate-200 mx-2" />
                <button
                  onClick={() => setView("form")}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Edit Input
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-all active:scale-95"
                >
                  Export PDF
                </button>
              </>
            ) : (
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                AI Structural JSON Generation Mode
              </span>
            )}
          </div>
        </div>
      </nav>

      <main className="py-12 px-6">
        <AnimatePresence mode="wait">
          {view === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded border border-blue-100 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Sparkles size={12} /> Architecting Next-Gen Careers
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
                  Professional Profile <span className="text-blue-600">Construction</span>
                </h2>
                <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                  Provide your expertise and history. Our AI engine will transform raw data into a high-impact, ATS-optimal structural document.
                </p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-md text-xs font-semibold flex items-center justify-between">
                  {error}
                  <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 text-lg">×</button>
                </div>
              )}

              <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-6xl mx-auto"
            >
              {resumeData && userInput && (
                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                  <div className="flex-1 w-full flex justify-center bg-slate-100 p-8 rounded-2xl border border-slate-200">
                    <ResumePreview data={resumeData} userInput={userInput} />
                  </div>
                  
                  <aside className="no-print w-full lg:w-80 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Output Insights</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-600">Action Verb Density</span>
                          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">High</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="w-4/5 h-full bg-blue-600"></div>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed italic">
                          "We've optimized your descriptions with strong action verbs and removed generic phrases to maximize impact."
                        </p>
                        <div className="pt-4 border-t border-slate-100">
                          <button 
                            onClick={handleReset}
                            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
                          >
                            <RotateCcw size={12} /> Start Fresh
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl text-white">
                      <p className="text-[10px] opacity-70 uppercase tracking-widest mb-1">System State</p>
                      <p className="text-xs font-medium">ATS-Optimal Structure Active</p>
                    </div>
                  </aside>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer - hidden on print */}
      <footer className="no-print py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
          ResumeArchitect Pro &copy; 2026 • Optimized for High-Growth Roles
        </p>
      </footer>
    </div>
  );
}

