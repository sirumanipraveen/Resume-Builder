import { ResumeData, UserInput } from "../types";
import { Mail, Globe, MapPin, Phone } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  userInput: UserInput;
}

export default function ResumePreview({ data, userInput }: ResumePreviewProps) {
  return (
    <div className="bg-white shadow-2xl p-16 min-h-[1056px] w-[750px] mx-auto font-serif text-[12px] leading-relaxed text-slate-800 print:shadow-none print:p-0 print:w-full">
      {/* Header */}
      <header className="text-center border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-[0.2em] text-slate-900 mb-1">
          {userInput.name}
        </h1>
        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-sans font-medium">
          {userInput.targetRole} • Global Remote • {userInput.name.toLowerCase().replace(/\s+/g, '.')}@architect.io
        </p>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-200 mb-3 pb-1">
          Professional Summary
        </h2>
        <p className="text-slate-700 leading-relaxed italic">
          {data.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-200 mb-4 pb-1">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-[13px] text-slate-900">{exp.company}</h3>
                <span className="text-slate-500 text-[10px] uppercase font-sans tracking-wider">{exp.period}</span>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-medium text-slate-600 text-[11px] italic">{exp.role}</span>
                <span className="text-slate-400 text-[10px] uppercase font-sans tracking-tighter">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1.5 text-slate-700">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="pl-1">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-2 gap-12">
        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-200 mb-3 pb-1">
            Technical Skills
          </h2>
          <div className="space-y-1.5 text-[11px] leading-snug text-slate-700">
            {data.skills.map((skill, i) => (
              <span key={i} className="inline-block mr-2 last:mr-0 after:content-[','] last:after:content-[''] font-medium">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-200 mb-3 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h3 className="font-bold text-slate-900 leading-tight">{edu.institution}</h3>
                <p className="text-slate-600 font-sans text-[10px] uppercase tracking-wide mt-0.5">{edu.degree} • {edu.period}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Projects */}
      <section className="mt-8">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 border-b border-slate-200 mb-4 pb-1">
          Key Projects
        </h2>
        <div className="space-y-5">
          {data.projects.map((proj, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-[12px] text-slate-900">{proj.name}</h3>
                <div className="flex gap-2">
                  {proj.technologies?.map((tech, k) => (
                    <span key={k} className="text-[9px] text-slate-400 font-mono uppercase tracking-tighter">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                {proj.bullets.map((bullet, j) => (
                  <li key={j} className="pl-1 leading-relaxed">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-auto pt-12 text-center text-[9px] text-slate-300 uppercase tracking-[0.3em] font-sans font-bold">
        Structural Integrity Verified • AI Architected
      </div>
    </div>
  );
}
