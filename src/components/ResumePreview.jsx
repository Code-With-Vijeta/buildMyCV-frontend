import React from "react";

export default function ResumePreview({ resume }) {
  const { personalInfo = {}, education = [], experience = [], skills = [], projects = [] } = resume;

  return (
    <div className="p-6 bg-white rounded shadow-md text-gray-800 w-full">
      <header className="mb-4 border-b pb-2">
        <h1 className="text-3xl font-bold">{personalInfo.name || "Your Name"}</h1>
        <p className="text-indigo-600 font-semibold">{personalInfo.title}</p>
        <p className="text-sm text-gray-500">{personalInfo.email} · {personalInfo.phone}</p>
      </header>

      {personalInfo.summary && (
        <section className="mb-4">
          <h3 className="font-semibold text-indigo-600">Summary</h3>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold text-indigo-600">Education</h3>
          {education.map((e,i) => (
            <div key={i} className="text-sm mb-2">
              <div className="font-medium">{e.degree} — {e.school}</div>
              <div className="text-xs text-gray-500">{e.startYear} — {e.endYear}</div>
              <p>{e.description}</p>
            </div>
          ))}
        </section>
      )}

       {experience.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold text-indigo-600">Experience</h3>
          {experience.map((exp,i) => (
            <div key={i} className="text-sm mb-2">
              <div className="font-medium">{exp.title} — {exp.company}</div>
              <div className="text-xs text-gray-500">{exp.startDate} — {exp.endDate}</div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold text-indigo-600">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((s,i) => <span key={i} className="text-xs bg-indigo-100 px-2 py-1 rounded">{s.skill || s}</span>)}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mb-4">
          <h3 className="font-semibold text-indigo-600">Projects</h3>
          {projects.map((p,i) => (
            <div key={i} className="text-sm mb-2">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-500">{p.link}</div>
              <p>{p.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
