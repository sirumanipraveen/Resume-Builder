import { motion, AnimatePresence } from "motion/react";
import { UserInput } from "../types";
import { User, Briefcase, Award, Code, BookOpen, Send, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

interface ResumeFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const STEPS = [
  { id: "basic", title: "Identity", icon: User, description: "Your name and target role" },
  { id: "skills", title: "Expertise", icon: Code, description: "Skills and technologies" },
  { id: "experience", title: "History", icon: Briefcase, description: "Work experience and achievements" },
  { id: "projects", title: "Evidence", icon: Award, description: "Key projects and outcomes" },
  { id: "education", title: "Foundation", icon: BookOpen, description: "Academic background" },
];

export default function ResumeForm({ onSubmit, isLoading }: ResumeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserInput>({
    name: "",
    targetRole: "",
    experience: "",
    skills: "",
    projects: "",
    education: "",
  });

  const handleChange = (field: keyof UserInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currentStepId = STEPS[currentStep].id;

  const isLastStep = currentStep === STEPS.length - 1;

  const next = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      onSubmit(formData);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const renderStep = () => {
    switch (currentStepId) {
      case "basic":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Full Identity</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all font-medium"
                value={formData.name}
                onChange={e => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Target Career Role</label>
              <input
                type="text"
                placeholder="e.g. Senior Software Engineer"
                className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all font-medium"
                value={formData.targetRole}
                onChange={e => handleChange("targetRole", e.target.value)}
              />
            </div>
          </div>
        );
      case "skills":
        return (
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Technical Core Skills</label>
            <textarea
              placeholder="List languages, frameworks, tools... (e.g. Python, React, AWS)"
              className="w-full h-48 bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all font-medium resize-none"
              value={formData.skills}
              onChange={e => handleChange("skills", e.target.value)}
            />
          </div>
        );
      case "experience":
        return (
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Professional History</label>
            <textarea
              placeholder="Detail your roles and impact... (e.g. Led scaling of core API at MidTech...)"
              className="w-full h-64 bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all font-medium resize-none leading-relaxed"
              value={formData.experience}
              onChange={e => handleChange("experience", e.target.value)}
            />
          </div>
        );
      case "projects":
        return (
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Selected Evidence</label>
            <textarea
              placeholder="Key projects and technical outcomes..."
              className="w-full h-64 bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all font-medium resize-none"
              value={formData.projects}
              onChange={e => handleChange("projects", e.target.value)}
            />
          </div>
        );
      case "education":
        return (
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Academic Foundation</label>
            <textarea
              placeholder="Degrees, Institutions, Tenure..."
              className="w-full h-48 bg-slate-50 border border-slate-200 px-4 py-3 rounded text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-600 transition-all font-medium resize-none"
              value={formData.education}
              onChange={e => handleChange("education", e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Progress */}
      <div className="mb-12 flex justify-between">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i <= currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-2 group">
              <div 
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isCurrent ? 'bg-blue-600 text-white scale-105 shadow-md shadow-blue-200' : 
                  isActive ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-transparent text-slate-300 border border-slate-200'
                }`}
              >
                <Icon size={18} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tight ${isActive ? 'text-slate-900' : 'text-slate-300'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900">{STEPS[currentStep].title}</h2>
        <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold mt-1">{STEPS[currentStep].description}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="min-h-[300px]"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={prev}
          disabled={currentStep === 0 || isLoading}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 disabled:opacity-30 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        
        <button
          onClick={next}
          disabled={isLoading}
          className={`flex items-center gap-2 px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest transition-all active:scale-95 ${
            isLastStep 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:bg-blue-700' 
              : 'bg-slate-900 text-white hover:bg-black shadow-md shadow-slate-200'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing
            </span>
          ) : isLastStep ? (
            <span className="flex items-center gap-2">
              Generate Pro <Sparkles size={14} className="text-amber-400 animate-pulse" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Continue <ChevronRight size={16} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
