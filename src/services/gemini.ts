import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, ResumeData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateResume(input: UserInput): Promise<ResumeData> {
  const prompt = `
    You are a professional resume writer.
    Create a high-quality, ATS-friendly resume based on the following user input.

    Rules:
    - Use clear sections: Summary, Skills, Experience, Education, Projects
    - Use bullet points for experience
    - Use action verbs (developed, built, optimized, etc.)
    - Keep it concise and professional
    - Tailor the summary to the job role: ${input.targetRole}
    - Avoid generic phrases
    - Make it ATS-friendly

    User Input:
    Name: ${input.name}
    Role: ${input.targetRole}
    Experience: ${input.experience}
    Skills: ${input.skills}
    Projects: ${input.projects}
    Education: ${input.education}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          skills: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          experience: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                role: { type: Type.STRING },
                period: { type: Type.STRING },
                location: { type: Type.STRING },
                bullets: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["company", "role", "period", "bullets"]
            }
          },
          projects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                technologies: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                bullets: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["name", "bullets"]
            }
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                institution: { type: Type.STRING },
                degree: { type: Type.STRING },
                period: { type: Type.STRING },
                location: { type: Type.STRING }
              },
              required: ["institution", "degree", "period"]
            }
          }
        },
        required: ["summary", "skills", "experience", "projects", "education"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate resume content");
  }

  return JSON.parse(response.text) as ResumeData;
}
