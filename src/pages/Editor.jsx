import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaPlus,
  FaLightbulb,
  FaChevronDown,
  FaChevronUp,
  FaImage,
  FaGraduationCap,
  FaBriefcase,
  FaBolt,
  FaSave,
  FaList,
  FaDownload,
  FaCheckCircle,
  FaIdCard,
  FaCode,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

// --- Template Components  ---
const templates = {
  professional: ({ resumeData }) => (
    <div className="p-8 bg-white shadow-lg min-h-[842px] max-w-[595px] mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-semibold">{resumeData.fullName}</h1>
        <h2 className="text-xl text-gray-600 font-light mt-1">
          {resumeData.title}
        </h2>
        <div className="text-sm text-gray-500 mt-2">
          <span>
            <FaEnvelope className="inline-block mr-1 text-gray-600" />{" "}
            {resumeData.email}
          </span>{" "}
          |{" "}
          <span>
            <FaPhone className="inline-block mr-1 text-gray-600" />{" "}
            {resumeData.phone}
          </span>
          {/* NEW: GitHub Link */}
          {resumeData.github && (
            <>
              {" "}
              |{" "}
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <FaCode className="inline-block mr-1 text-gray-600" /> GitHub
              </a>
            </>
          )}
          {/* NEW: LinkedIn Link */}
          {resumeData.linkedin && (
            <>
              {" "}
              |{" "}
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <FaIdCard className="inline-block mr-1 text-gray-600" />{" "}
                LinkedIn
              </a>
            </>
          )}
        </div>
      </header>
      <div className="space-y-8">
        {/* Summary Section */}
        {resumeData.summary.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Summary
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {resumeData.experience.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Experience
            </h3>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.role}</h4>
                    <p className="text-sm italic text-gray-600">
                      {exp.company}
                      {/* DISPLAY LOCATION */}
                      {exp.location && (
                        <span className="ml-1 text-xs"> | {exp.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {resumeData.education.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-sm italic text-gray-600">
                      {edu.school}
                      {/* DISPLAY LOCATION */}
                      {edu.location && (
                        <span className="ml-1 text-xs"> | {edu.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>

                {/* DISPLAY MARKS/GPA */}
                {edu.marks && (
                  <p className="text-xs text-gray-500 mt-1">
                    **GPA/Marks:** {edu.marks}
                  </p>
                )}

                <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {Object.keys(resumeData.skills).length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Skills
            </h3>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="mt-2">
                <h4 className="font-bold">{category}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-200 text-gray-800 text-center py-1 rounded-sm text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications Section */}
        {resumeData.certifications.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Certifications
            </h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {resumeData.certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{cert.name}</strong> -{" "}
                  {cert.authority}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Projects Section */}
        {resumeData.projects.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Projects
            </h3>
            {resumeData.projects.map((project, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{project.name}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        <FaExternalLinkAlt className="inline-block mr-1" /> View
                        Project
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-1">
                  {project.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Awards & Honors Section */}
        {resumeData.awards && resumeData.awards.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Awards & Honors
            </h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {resumeData.awards.map((award, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{award.name}</strong> -{" "}
                  {award.authority} ({award.date})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  ),
  modern: ({ resumeData }) => (
    <div
      className="p-8 shadow-lg bg-white min-h-[842px] max-w-[595px] mx-auto text-gray-800"
      style={{
        fontFamily: resumeData.font,
      }}
    >
      {/* --- 1. HEADER (Name & Contact) --- */}
      <header
        className="pb-3 mb-4"
        style={{ borderBottom: `3px solid ${resumeData.color}` }}
      >
        <h1
          className="text-4xl font-extrabold uppercase mb-1"
          style={{ color: resumeData.color }}
        >
          {resumeData.fullName}
        </h1>
        <h2 className="text-xl font-semibold text-gray-700">
          {resumeData.title}
        </h2>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2 text-gray-600">
          {resumeData.email && (
            <span className="flex items-center gap-1">
              <FaEnvelope size={10} /> {resumeData.email}
            </span>
          )}
          {resumeData.phone && (
            <span className="flex items-center gap-1">
              <FaPhone size={10} /> {resumeData.phone}
            </span>
          )}
          {resumeData.linkedin && (
            <a
              href={resumeData.linkedin}
              className="flex items-center gap-1 underline hover:text-blue-500"
            >
              <FaIdCard size={10} /> LinkedIn
            </a>
          )}
          {resumeData.github && (
            <a
              href={resumeData.github}
              className="flex items-center gap-1 underline hover:text-blue-500"
            >
              <FaCode size={10} /> GitHub
            </a>
          )}
        </div>
      </header>

      {/* --- 2. SUMMARY/PROFILE --- */}
      {resumeData.summary && (
        <section className="mt-4">
          <h3
            className="text-lg font-bold uppercase pb-1 mb-2"
            style={{
              borderBottom: `2px solid ${resumeData.color}`,
              color: resumeData.color,
            }}
          >
            Profile Summary
          </h3>
          <p className="text-sm">{resumeData.summary}</p>
        </section>
      )}

      {/* --- 3. EXPERIENCE --- */}
      {resumeData.experience.length > 0 && (
        <section className="mt-5">
          <h3
            className="text-lg font-bold uppercase pb-1 mb-2"
            style={{
              borderBottom: `2px solid ${resumeData.color}`,
              color: resumeData.color,
            }}
          >
            Professional Experience
          </h3>
          {resumeData.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{exp.role}</h4>
                  <p className="text-sm italic text-gray-600">
                    {exp.company}
                    {/* NEW: Add location after company, separated by a comma or dash */}
                    {exp.location && (
                      <span className="ml-1"> | {exp.location}</span>
                    )}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              {/* Note: I'm assuming description will be formatted as a bulleted list in the editor, 
       but if it's plain text, this is fine. */}
              <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* --- 4. PROJECTS --- */}
      {resumeData.projects.length > 0 && (
        <section className="mt-5">
          <h3
            className="text-lg font-bold uppercase pb-1 mb-2"
            style={{
              borderBottom: `2px solid ${resumeData.color}`,
              color: resumeData.color,
            }}
          >
            Projects
          </h3>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-3 text-sm">
              <div className="flex justify-between items-start">
                <h4 className="font-bold" style={{ color: resumeData.color }}>
                  {project.name}
                </h4>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline flex items-center gap-1"
                  >
                    <FaExternalLinkAlt size={8} /> View Project
                  </a>
                )}
              </div>
              <p className="text-sm mt-1">{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* --- 5. EDUCATION --- */}
      {resumeData.education.length > 0 && (
        <section className="mt-5">
          <h3
            className="text-lg font-bold uppercase pb-1 mb-2"
            style={{
              borderBottom: `2px solid ${resumeData.color}`,
              color: resumeData.color,
            }}
          >
            Education
          </h3>
          {resumeData.education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
            >
              <button
                onClick={() => deleteEducation(idx)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>

              {/* Input: School/University */}
              <input
                type="text"
                placeholder="School/University"
                className="w-full border p-2 rounded"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].school = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* Input: Degree */}
              <input
                type="text"
                placeholder="Degree"
                className="w-full border p-2 rounded"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].degree = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* NEW INPUT: Marks/GPA */}
              <input
                type="text"
                placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                className="w-full border p-2 rounded"
                value={edu.marks}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].marks = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* NEW INPUT: Location */}
              <input
                type="text"
                placeholder="Location (e.g., Mumbai, India)"
                className="w-full border p-2 rounded"
                value={edu.location}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].location = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* Date Range Group */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="w-1/2 border p-2 rounded"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].startDate = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="w-1/2 border p-2 rounded"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].endDate = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />
              </div>

              {/* Input: Description */}
              <textarea
                rows="2"
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={edu.description}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].description = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              ></textarea>
            </div>
          ))}
        </section>
      )}

      {/* --- 6. SKILLS --- */}
      {Object.keys(resumeData.skills).some(
        (key) => resumeData.skills[key].length > 0
      ) && (
        <section className="mt-5">
          <h3
            className="text-lg font-bold uppercase pb-1 mb-2"
            style={{
              borderBottom: `2px solid ${resumeData.color}`,
              color: resumeData.color,
            }}
          >
            Technical Skills
          </h3>
          <div className="text-sm mt-1 grid grid-cols-2 gap-y-1">
            {Object.keys(resumeData.skills).map(
              (key) =>
                resumeData.skills[key].length > 0 && (
                  <div key={key}>
                    <span
                      className="font-semibold capitalize"
                      style={{ color: resumeData.color }}
                    >
                      {key}:
                    </span>{" "}
                    {resumeData.skills[key].join(", ")}
                  </div>
                )
            )}
          </div>
        </section>
      )}

      {/* --- 7. CERTIFICATIONS --- */}
      {resumeData.certifications.length > 0 && (
        <section className="mt-5">
          <h3
            className="text-lg font-bold uppercase pb-1 mb-2"
            style={{
              borderBottom: `2px solid ${resumeData.color}`,
              color: resumeData.color,
            }}
          >
            Certifications
          </h3>
          <div className="text-sm">
            {resumeData.certifications.map((cert, index) => (
              <p key={index} className="mb-1">
                <span
                  className="font-semibold"
                  style={{ color: resumeData.color }}
                >
                  {cert.name}
                </span>{" "}
                by {cert.authority}
              </p>
            ))}
          </div>
        </section>
      )}
    </div>
  ),
  minimalist: ({ resumeData }) => (
    <div
      className="p-8 bg-white shadow-lg min-h-[842px] max-w-[595px] mx-auto"
      style={{ fontFamily: resumeData.font }}
    >
      <div className="text-center mb-6">
        <h1 className="text-4xl font-light tracking-wide">
          {resumeData.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-600 mt-1">
          {resumeData.title || "Your Title"}
        </p>

        {/* Contact Info with LinkedIn & GitHub */}
        <div className="flex justify-center flex-wrap gap-4 text-sm mt-2">
          <span>{resumeData.email}</span>
          <span>|</span>
          <span>{resumeData.phone}</span>
          {resumeData.linkedin && (
            <>
              <span>|</span>
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-700"
              >
                LinkedIn
              </a>
            </>
          )}
          {resumeData.github && (
            <>
              <span>|</span>
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-700"
              >
                GitHub
              </a>
            </>
          )}
        </div>
      </div>
      <div className="space-y-6">
        {resumeData.summary.length > 0 && (
          <>
            <h2
              className="text-xl font-bold text-gray-800 border-b-2"
              style={{ borderColor: resumeData.color }}
            >
              Summary
            </h2>
            <p className="text-gray-700">{resumeData.summary}</p>
          </>
        )}
        {resumeData.experience.length > 0 && (
          <>
            <h2
              className="text-xl font-bold text-gray-800 border-b-2"
              style={{ borderColor: resumeData.color }}
            >
              Experience
            </h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.role}</h4>
                    <p className="text-sm italic text-gray-600">
                      {exp.company}
                      {/* NEW: Add location after company, separated by a comma or dash */}
                      {exp.location && (
                        <span className="ml-1"> | {exp.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {/* Note: I'm assuming description will be formatted as a bulleted list in the editor, 
       but if it's plain text, this is fine. */}
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </>
        )}
        {resumeData.education.length > 0 && (
          <>
            <h2
              className="text-xl font-bold text-gray-800 border-b-2"
              style={{ borderColor: resumeData.color }}
            >
              Education
            </h2>
            {resumeData.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
              >
                <button
                  onClick={() => deleteEducation(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>

                {/* Input: School/University */}
                <input
                  type="text"
                  placeholder="School/University"
                  className="w-full border p-2 rounded"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].school = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Input: Degree */}
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full border p-2 rounded"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Marks/GPA */}
                <input
                  type="text"
                  placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                  className="w-full border p-2 rounded"
                  value={edu.marks}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].marks = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Location */}
                <input
                  type="text"
                  placeholder="Location (e.g., Mumbai, India)"
                  className="w-full border p-2 rounded"
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].location = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Date Range Group */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].startDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].endDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                </div>

                {/* Input: Description */}
                <textarea
                  rows="2"
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].description = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                ></textarea>
              </div>
            ))}
          </>
        )}
        {Object.keys(resumeData.skills).length > 0 && (
          <>
            <h2
              className="text-xl font-bold text-gray-800 border-b-2"
              style={{ borderColor: resumeData.color }}
            >
              Skills
            </h2>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="font-semibold">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
        {resumeData.certifications.length > 0 && (
          <>
            <h2
              className="text-xl font-bold mt-4 text-gray-800 border-b-2"
              style={{ borderColor: resumeData.color }}
            >
              Certifications
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {resumeData.certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{cert.name}</strong> -
                  {cert.authority}
                </li>
              ))}
            </ul>
          </>
        )}
        {resumeData.projects.length > 0 && (
          <>
            <h2
              className="text-xl font-bold text-gray-800 border-b-2"
              style={{ borderColor: resumeData.color }}
            >
              Projects
            </h2>
            {resumeData.projects.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold">
                  <span>{project.name}</span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm ml-2"
                    >
                      <FaExternalLinkAlt className="inline-block" /> View
                    </a>
                  )}
                </div>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  ),
  executive: ({ resumeData }) => (
    <div
      className="p-8 space-y-8 bg-white shadow-lg min-h-[842px] max-w-[595px] mx-auto"
      style={{ fontFamily: resumeData.font }}
    >
      <header className="flex flex-col items-center text-center">
        <h1
          className="text-5xl font-extrabold tracking-tight"
          style={{ color: resumeData.color }}
        >
          {resumeData.fullName}
        </h1>
        <h2 className="text-2xl mt-2 text-gray-700 font-semibold">
          {resumeData.title}
        </h2>
        {/* Contact Info with LinkedIn & GitHub */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500">
          {resumeData.email && (
            <span>
              <FaEnvelope className="inline-block mr-1 text-gray-600" />{" "}
              {resumeData.email}
            </span>
          )}
          {resumeData.phone && (
            <span>
              <FaPhone className="inline-block mr-1 text-gray-600" />{" "}
              {resumeData.phone}
            </span>
          )}
          {resumeData.linkedin && (
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-500 flex items-center"
            >
              <FaIdCard className="inline-block mr-1 text-gray-600" /> LinkedIn
            </a>
          )}
          {resumeData.github && (
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-500 flex items-center"
            >
              <FaCode className="inline-block mr-1 text-gray-600" /> GitHub
            </a>
          )}
        </div>
      </header>

      {resumeData.summary.length > 0 && (
        <section>
          <h3
            className="text-2xl font-bold mb-2 pb-1 border-b-4"
            style={{ borderColor: resumeData.color }}
          >
            Professional Summary
          </h3>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </section>
      )}

      {resumeData.experience.length > 0 && (
        <section>
          <h3
            className="text-2xl font-bold mb-2 pb-1 border-b-4"
            style={{ borderColor: resumeData.color }}
          >
            Experience
          </h3>
          {resumeData.experience.map((exp, idx) => (
            <div key={idx} className="mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{exp.role}</h4>
                  <p className="text-sm italic text-gray-600">
                    {exp.company}
                    {/* NEW: Add location after company, separated by a comma or dash */}
                    {exp.location && (
                      <span className="ml-1"> | {exp.location}</span>
                    )}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              {/* Note: I'm assuming description will be formatted as a bulleted list in the editor, 
       but if it's plain text, this is fine. */}
              <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {resumeData.education.length > 0 && (
        <section>
          <h3
            className="text-2xl font-bold mb-2 pb-1 border-b-4"
            style={{ borderColor: resumeData.color }}
          >
            Education
          </h3>
          {resumeData.education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
            >
              <button
                onClick={() => deleteEducation(idx)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>

              {/* Input: School/University */}
              <input
                type="text"
                placeholder="School/University"
                className="w-full border p-2 rounded"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].school = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* Input: Degree */}
              <input
                type="text"
                placeholder="Degree"
                className="w-full border p-2 rounded"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].degree = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* NEW INPUT: Marks/GPA */}
              <input
                type="text"
                placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                className="w-full border p-2 rounded"
                value={edu.marks}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].marks = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* NEW INPUT: Location */}
              <input
                type="text"
                placeholder="Location (e.g., Mumbai, India)"
                className="w-full border p-2 rounded"
                value={edu.location}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].location = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* Date Range Group */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="w-1/2 border p-2 rounded"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].startDate = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="w-1/2 border p-2 rounded"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].endDate = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />
              </div>

              {/* Input: Description */}
              <textarea
                rows="2"
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={edu.description}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].description = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              ></textarea>
            </div>
          ))}
        </section>
      )}

      {Object.keys(resumeData.skills).length > 0 && (
        <section>
          <h3
            className="text-2xl font-bold mb-2 pb-1 border-b-4"
            style={{ borderColor: resumeData.color }}
          >
            Skills
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <li key={category}>
                <strong className="block">{category}</strong>
                <span className="text-sm text-gray-700">
                  {skills.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {resumeData.certifications.length > 0 && (
        <section>
          <h3
            className="text-2xl font-bold mb-2 pb-1 border-b-4"
            style={{ borderColor: resumeData.color }}
          >
            Certifications
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {resumeData.certifications.map((cert, idx) => (
              <li key={idx}>
                <strong className="font-bold">{cert.name}</strong> -{" "}
                {cert.authority}
              </li>
            ))}
          </ul>
        </section>
      )}

      {resumeData.projects.length > 0 && (
        <section>
          <h3
            className="text-2xl font-bold mb-2 pb-1 border-b-4"
            style={{ borderColor: resumeData.color }}
          >
            Projects
          </h3>
          {resumeData.projects.map((project, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{project.name}</h4>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      <FaExternalLinkAlt className="inline-block mr-1" /> View
                      Project
                    </a>
                  )}
                </div>
              </div>
              <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">
                {project.description}
              </p>
            </div>
          ))}
        </section>
      )}
    </div>
  ),
  creative: ({ resumeData }) => (
    <div
      className="flex flex-col md:flex-row p-6 bg-white shadow-lg min-h-[842px] max-w-[595px] mx-auto"
      style={{ fontFamily: resumeData.font }}
    >
      {/* LEFT COLUMN: Personal, Contact, Skills, Education, Certs/Projects */}
      <div
        className="md:w-1/3 p-6 rounded-l-lg md:rounded-l-none md:rounded-t-lg"
        style={{
          backgroundColor: resumeData.color + "1A", // Light background using theme color
        }}
      >
        {resumeData.profileImage && (
          <img
            src={resumeData.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 object-cover"
            style={{ borderColor: resumeData.color }}
          />
        )}
        <div className="text-center">
          <h1
            className="text-3xl font-bold"
            style={{ color: resumeData.color }}
          >
            {resumeData.fullName}
          </h1>
          <p className="text-lg text-gray-700 mt-1">{resumeData.title}</p>
        </div>

        {/* Contact (Updated to include social links) */}
        <div className="mt-8 space-y-4">
          <h3
            className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1"
            style={{ color: resumeData.color, borderColor: resumeData.color }}
          >
            Contact
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            {resumeData.email && (
              <p>
                <FaEnvelope className="inline-block mr-2" />
                {resumeData.email}
              </p>
            )}
            {resumeData.phone && (
              <p>
                <FaPhone className="inline-block mr-2" />
                {resumeData.phone}
              </p>
            )}
            {resumeData.linkedin && (
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <FaIdCard className="mr-2" /> LinkedIn
              </a>
            )}
            {resumeData.github && (
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                <FaCode className="mr-2" /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Skills */}
        {Object.keys(resumeData.skills).length > 0 && (
          <div className="mt-6">
            <h3
              className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1"
              style={{ color: resumeData.color, borderColor: resumeData.color }}
            >
              Skills
            </h3>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="mt-2">
                <h4 className="font-semibold text-sm">{category}</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: resumeData.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <div className="mt-6">
            <h3
              className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1"
              style={{ color: resumeData.color, borderColor: resumeData.color }}
            >
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
              >
                <button
                  onClick={() => deleteEducation(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>

                {/* Input: School/University */}
                <input
                  type="text"
                  placeholder="School/University"
                  className="w-full border p-2 rounded"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].school = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Input: Degree */}
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full border p-2 rounded"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Marks/GPA */}
                <input
                  type="text"
                  placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                  className="w-full border p-2 rounded"
                  value={edu.marks}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].marks = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Location */}
                <input
                  type="text"
                  placeholder="Location (e.g., Mumbai, India)"
                  className="w-full border p-2 rounded"
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].location = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Date Range Group */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].startDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].endDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                </div>

                {/* Input: Description */}
                <textarea
                  rows="2"
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].description = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                ></textarea>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && (
          <div className="mt-6">
            <h3
              className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1"
              style={{ color: resumeData.color, borderColor: resumeData.color }}
            >
              Certifications
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              {resumeData.certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{cert.name}</strong> -{" "}
                  {cert.authority}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects (Small list version in side column) */}
        {resumeData.projects.length > 0 && (
          <div className="mt-6">
            <h3
              className="text-lg font-bold uppercase tracking-wider border-b-2 pb-1"
              style={{ color: resumeData.color, borderColor: resumeData.color }}
            >
              Projects
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              {resumeData.projects.map((project, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{project.name}</strong>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline ml-2"
                    >
                      <FaExternalLinkAlt className="inline-block" /> View
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Summary and Experience */}
      <div className="md:w-2/3 p-6 space-y-6">
        {/* Summary */}
        {resumeData.summary.length > 0 && (
          <section>
            <h3
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color, color: resumeData.color }}
            >
              Summary
            </h3>
            <p className="text-gray-800 text-sm mt-2">{resumeData.summary}</p>
          </section>
        )}

        {/* Experience (Updated to use bullet points) */}
        {resumeData.experience.length > 0 && (
          <section>
            <h3
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color, color: resumeData.color }}
            >
              Experience
            </h3>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.role}</h4>
                    <p className="text-sm italic text-gray-600">
                      {exp.company}
                      {/* NEW: Add location after company, separated by a comma or dash */}
                      {exp.location && (
                        <span className="ml-1"> | {exp.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {/* Note: I'm assuming description will be formatted as a bulleted list in the editor, 
       but if it's plain text, this is fine. */}
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  ),
  classic: ({ resumeData }) => (
    <div
      className="p-8 bg-white shadow-lg min-h-[842px] max-w-[595px] mx-auto"
      style={{ fontFamily: resumeData.font }}
    >
      <header className="mb-6">
        <h1 className="text-4xl font-bold">{resumeData.fullName}</h1>
        <p className="text-lg text-gray-600">{resumeData.title}</p>

        {/* Updated Contact Info with Icons and Social Links */}
        <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-x-2 justify-start">
          {resumeData.email && (
            <span className="flex items-center gap-1">
              <FaEnvelope className="inline-block text-gray-600" />
              {resumeData.email}
            </span>
          )}
          {resumeData.phone && (
            <>
              <span className="text-gray-300">|</span>{" "}
              <span className="flex items-center gap-1">
                <FaPhone className="inline-block text-gray-600" />
                {resumeData.phone}
              </span>
            </>
          )}
          {resumeData.linkedin && (
            <>
              <span className="text-gray-300">|</span>{" "}
              <a
                href={resumeData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                <FaIdCard className="inline-block text-gray-600" /> LinkedIn
              </a>
            </>
          )}
          {resumeData.github && (
            <>
              <span className="text-gray-300">|</span>{" "}
              <a
                href={resumeData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
              >
                <FaCode className="inline-block text-gray-600" /> GitHub
              </a>
            </>
          )}
        </div>
      </header>

      <div className="space-y-6">
        {resumeData.summary.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Summary
            </h2>
            <p className="text-gray-700 mt-2">{resumeData.summary}</p>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Experience
            </h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.role}</h4>
                    <p className="text-sm italic text-gray-600">
                      {exp.company}
                      {/* NEW: Add location after company, separated by a comma or dash */}
                      {exp.location && (
                        <span className="ml-1"> | {exp.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {/* Note: I'm assuming description will be formatted as a bulleted list in the editor, 
       but if it's plain text, this is fine. */}
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Education
            </h2>
            {resumeData.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
              >
                <button
                  onClick={() => deleteEducation(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>

                {/* Input: School/University */}
                <input
                  type="text"
                  placeholder="School/University"
                  className="w-full border p-2 rounded"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].school = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Input: Degree */}
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full border p-2 rounded"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Marks/GPA */}
                <input
                  type="text"
                  placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                  className="w-full border p-2 rounded"
                  value={edu.marks}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].marks = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Location */}
                <input
                  type="text"
                  placeholder="Location (e.g., Mumbai, India)"
                  className="w-full border p-2 rounded"
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].location = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Date Range Group */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].startDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].endDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                </div>

                {/* Input: Description */}
                <textarea
                  rows="2"
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].description = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                ></textarea>
              </div>
            ))}
          </section>
        )}

        {Object.keys(resumeData.skills).length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Skills
            </h2>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="mt-2">
                <h4 className="font-semibold">{category}</h4>
                <div className="text-gray-700 text-sm">
                  {skills.join(" | ")}
                </div>
              </div>
            ))}
          </section>
        )}

        {resumeData.certifications.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Certifications
            </h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {resumeData.certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{cert.name}</strong> -{" "}
                  {cert.authority}
                </li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.projects.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold border-b-2 pb-1"
              style={{ borderColor: resumeData.color }}
            >
              Projects
            </h2>
            {resumeData.projects.map((project, idx) => (
              <div key={idx} className="mt-4">
                <h3 className="font-bold text-gray-800">{project.name}</h3>
                {project.link && (
                  <p className="text-sm text-blue-600 mb-1">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <FaExternalLinkAlt className="inline-block mr-1" /> View
                      Project
                    </a>
                  </p>
                )}
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  ),
  bold: ({ resumeData }) => (
    <div
      className="p-8 bg-white shadow-lg min-h-[842px] max-w-[595px] mx-auto"
      style={{ fontFamily: resumeData.font }}
    >
      <header className="mb-8">
        <h1
          className="text-5xl font-extrabold"
          style={{ color: resumeData.color }}
        >
          {resumeData.fullName}
        </h1>
        <h2 className="text-2xl font-bold text-gray-700 mt-2">
          {resumeData.title}
        </h2>
        <hr
          className="my-4"
          style={{ height: "4px", backgroundColor: resumeData.color }}
        />
        {/* Updated Contact Info with Social Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
          {resumeData.email && (
            <span>
              <FaEnvelope className="inline-block mr-1 text-gray-600" />{" "}
              {resumeData.email}
            </span>
          )}
          {resumeData.phone && (
            <span>
              <FaPhone className="inline-block mr-1 text-gray-600" />{" "}
              {resumeData.phone}
            </span>
          )}
          {resumeData.linkedin && (
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center"
            >
              <FaIdCard className="inline-block mr-1 text-gray-600" /> LinkedIn
            </a>
          )}
          {resumeData.github && (
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center"
            >
              <FaCode className="inline-block mr-1 text-gray-600" /> GitHub
            </a>
          )}
        </div>
      </header>
      <div className="space-y-10">
        {resumeData.summary.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{ color: resumeData.color }}
            >
              Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.summary}
            </p>
          </section>
        )}

        {resumeData.experience.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{ color: resumeData.color }}
            >
              Experience
            </h3>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{exp.role}</h4>
                    <p className="text-sm italic text-gray-600">
                      {exp.company}
                      {/* NEW: Add location after company, separated by a comma or dash */}
                      {exp.location && (
                        <span className="ml-1"> | {exp.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                {/* Note: I'm assuming description will be formatted as a bulleted list in the editor, 
       but if it's plain text, this is fine. */}
                <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {resumeData.education.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{ color: resumeData.color }}
            >
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
              >
                <button
                  onClick={() => deleteEducation(idx)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>

                {/* Input: School/University */}
                <input
                  type="text"
                  placeholder="School/University"
                  className="w-full border p-2 rounded"
                  value={edu.school}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].school = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Input: Degree */}
                <input
                  type="text"
                  placeholder="Degree"
                  className="w-full border p-2 rounded"
                  value={edu.degree}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].degree = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Marks/GPA */}
                <input
                  type="text"
                  placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                  className="w-full border p-2 rounded"
                  value={edu.marks}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].marks = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* NEW INPUT: Location */}
                <input
                  type="text"
                  placeholder="Location (e.g., Mumbai, India)"
                  className="w-full border p-2 rounded"
                  value={edu.location}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].location = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />

                {/* Date Range Group */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Start Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.startDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].startDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    className="w-1/2 border p-2 rounded"
                    value={edu.endDate}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[idx].endDate = e.target.value;
                      setResumeData({ ...resumeData, education: newEdu });
                    }}
                  />
                </div>

                {/* Input: Description */}
                <textarea
                  rows="2"
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={edu.description}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].description = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                ></textarea>
              </div>
            ))}
          </section>
        )}

        {Object.keys(resumeData.skills).length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{ color: resumeData.color }}
            >
              Skills
            </h3>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} className="mt-2">
                <h4 className="font-bold">{category}</h4>
                <ul className="list-none grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
                  {skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: resumeData.color }}
                      ></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {resumeData.certifications.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{ color: resumeData.color }}
            >
              Certifications
            </h3>
            <ul className="list-none space-y-2 text-gray-700 text-sm">
              {resumeData.certifications.map((cert, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{cert.name}</strong> -{" "}
                  {cert.authority}
                </li>
              ))}
            </ul>
          </section>
        )}

        {resumeData.projects.length > 0 && (
          <section>
            <h3
              className="text-2xl font-bold uppercase mb-4"
              style={{ color: resumeData.color }}
            >
              Projects
            </h3>
            <ul className="list-none space-y-2 text-gray-700 text-sm">
              {resumeData.projects.map((project, idx) => (
                <li key={idx}>
                  <strong className="font-bold">{project.name}</strong>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline ml-2"
                    >
                      <FaExternalLinkAlt className="inline-block" /> View
                    </a>
                  )}
                  <p className="mt-1 whitespace-pre-line">
                    {project.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  ),
};

const defaultResumeData = {
  fullName: "Your Name",
  title: "Your Job Title",
  email: "email@example.com",
  phone: "123-456-7890",
  summary: "",
  education: [],
  experience: [],
  linkedin: "",
  github: "",
  skills: {},
  certifications: [],
  projects: [],
  profileImage: null,
  template: "professinal",
  color: "#007BFF",
  font: "Roboto",
};

const ResumeEditor = ({ resumeId, onSaveSuccess, onCancelEdit }) => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [newSkill, setNewSkill] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Technical");
  const [newSkillCategoryInput, setNewSkillCategoryInput] = useState("");
  const [newCertification, setNewCertification] = useState({
    name: "",
    authority: "",
    link: "",
  });
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    link: "",
  });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { id: urlId } = useParams();
  const effectiveResumeId = resumeId || urlId;

  const handleViewResumes = () => {
    navigate("/dashboard");
  };

  const previewRef = useRef(null);

  useEffect(() => {
    const fetchResume = async () => {
      if (!effectiveResumeId) {
        setResumeData(defaultResumeData);
        return;
      }

      setIsLoading(true);

      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // ✅ Await the axios call and store the response
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/resumes/${effectiveResumeId}`,
          config
        );

        const fetchedData = response.data;

        // 🛠 Merge defaults with fetched data
        const mergedData = {
          ...defaultResumeData,
          ...fetchedData,
          education: fetchedData.education || [],
          experience: fetchedData.experience || [],
          projects: fetchedData.projects || [],
          certifications: fetchedData.certifications || [],
          skills: fetchedData.skills || {},
        };

        setResumeData(mergedData);
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        toast.error(
          "❌ Failed to load resume. Check server console for 500/404 error."
        );
        setResumeData(defaultResumeData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResume();
  }, [effectiveResumeId]);

  const fetchAiSuggestions = async () => {
    setIsLoadingAi(true);
    try {
      const response = await axios.post("/api/ai-suggestions", {
        jobTitle: resumeData.title,
      });

      const suggestions = response.data.content
        .split("\n")
        .filter((line) => line.trim().length > 0);

      setAiSuggestions(suggestions);
    } catch (error) {
      console.error("AI API Error:", error.response?.data || error.message);
      setAiSuggestions([
        "Led a team of 5 developers to launch a new product, increasing user engagement by 30%.",
        "Developed and maintained scalable web applications using React and Node.js.",
        "Optimized database queries, reducing average response time by 40%.",
        "Implemented a CI/CD pipeline, improving deployment frequency and reliability.",
        "Designed and integrated RESTful APIs, enabling seamless communication between front-end and back-end services.",
        "Collaborated with cross-functional teams to define project scope and requirements, ensuring timely delivery.",
        "Authored comprehensive technical documentation for new features, reducing onboarding time for new developers by 25%.",
        "Engineered automated test scripts that identified and resolved critical bugs before production release.",
        "Migrated legacy systems to a modern tech stack, improving performance by 50%.",
        "Resolved complex production issues by conducting in-depth root cause analysis, improving system stability and uptime.",
      ]);
    } finally {
      setIsLoadingAi(false);
      setShowAiSuggestions(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const isUpdating = effectiveResumeId;
      let url = `${import.meta.env.VITE_BASE_URL}/api/resumes`;
      let method = "post";

      if (isUpdating) {
        url = `${
          import.meta.env.VITE_BASE_URL
        }/api/resumes/${effectiveResumeId}`;
        method = "put";
      }

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios[method](url, resumeData, config);

      if (res.data._id) {
        toast.success("Resume successfully saved and updated!");

        setResumeData((prevData) => ({
          ...prevData,
          ...res.data,
          _id: res.data._id,
          education: res.data.education || [],
          experience: res.data.experience || [],
          projects: res.data.projects || [],
          skills: res.data.skills || {},
        }));

        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Save Error:", err.response ? err.response.data : err);
      toast.error(
        `Error saving: ${err.response?.data?.message || "Network error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
          marks: "",
          location: "",
        },
      ],
    });
  };

  const deleteEducation = (index) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
        },
      ],
    });
  };

  const deleteExperience = (index) => {
    const updatedExperience = resumeData.experience.filter(
      (_, i) => i !== index
    );
    setResumeData({ ...resumeData, experience: updatedExperience });
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      (newSkillCategory.trim() || newSkillCategoryInput.trim())
    ) {
      const categoryToUse = newSkillCategoryInput.trim() || newSkillCategory;
      setResumeData((prevData) => ({
        ...prevData,
        skills: {
          ...prevData.skills,
          [categoryToUse]: [
            ...(prevData.skills[categoryToUse] || []),
            newSkill.trim(),
          ],
        },
      }));
      setNewSkill("");
      setNewSkillCategoryInput("");
    } else {
      toast.warn("Please enter a skill and a category name.");
    }
  };

  const deleteSkill = (category, index) => {
    const updatedSkills = { ...resumeData.skills };
    updatedSkills[category] = updatedSkills[category].filter(
      (_, i) => i !== index
    );
    if (updatedSkills[category].length === 0) {
      delete updatedSkills[category];
    }
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData({ ...resumeData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
      toast.success("🖼️ Image uploaded!");
    }
  };

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.authority.trim()) {
      setResumeData({
        ...resumeData,
        certifications: [...resumeData.certifications, newCertification],
      });
      setNewCertification({ name: "", authority: "", link: "" });
    } else {
      toast.warn("Please fill in both certification name and authority.");
    }
  };

  const deleteCertification = (index) => {
    const updatedCertifications = resumeData.certifications.filter(
      (_, i) => i !== index
    );
    setResumeData({ ...resumeData, certifications: updatedCertifications });
  };

  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      setResumeData({
        ...resumeData,
        projects: [...resumeData.projects, newProject],
      });
      setNewProject({ name: "", description: "", link: "" });
    } else {
      toast.warn("Please fill in project name and description.");
    }
  };

  const deleteProject = (index) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({ ...resumeData, projects: updatedProjects });
  };

  const downloadPDF = async () => {
    const input = previewRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const margin = 5;
    pdf.addImage(
      imgData,
      "PNG",
      margin,
      margin,
      pdfWidth - 2 * margin,
      pdfHeight
    );
    pdf.save(`${resumeData.fullName || "resume"}.pdf`);
    toast.success("📥 PDF downloaded successfully!");
  };

  const TemplateComponent =
    templates[resumeData.template] || templates.professional;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 p-4 md:p-6 gap-6">
      {/* --- Left Side: Editor Form --- */}
      <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6 space-y-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
          📝 Resume Editor
        </h2>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            onClick={handleViewResumes}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition font-semibold text-sm"
          >
            <FaList /> View My Resumes
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold text-sm"
          >
            <FaSave /> Save Resume
          </button>
        </div>
        {/* Profile Image */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FaImage /> Profile Image
          </h3>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full text-gray-700 mt-1"
          />
        </div>
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-gray-700 font-medium">Full Name</span>
            <input
              type="text"
              placeholder="e.g., Jane Doe"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.fullName}
              onChange={(e) =>
                setResumeData({ ...resumeData, fullName: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Job Title</span>
            <input
              type="text"
              placeholder="e.g., Software Engineer"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.title}
              onChange={(e) =>
                setResumeData({ ...resumeData, title: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              placeholder="e.g., jane.doe@example.com"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.email}
              onChange={(e) =>
                setResumeData({ ...resumeData, email: e.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-gray-700 font-medium">Phone</span>
            <input
              type="tel"
              placeholder="e.g., 123-456-7890"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.phone}
              onChange={(e) =>
                setResumeData({ ...resumeData, phone: e.target.value })
              }
            />
          </label>
          {/* 🚀 NEW: LinkedIn Profile URL */}
          <label className="block">
            <span className="text-gray-700 font-medium">LinkedIn Profile</span>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourname"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.linkedin || ""} // Ensure it reads from state
              onChange={(e) =>
                setResumeData({ ...resumeData, linkedin: e.target.value })
              }
            />
          </label>

          {/* 🚀 NEW: GitHub Profile URL */}
          <label className="block">
            <span className="text-gray-700 font-medium">GitHub Profile</span>
            <input
              type="url"
              placeholder="https://github.com/yourusername"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.github || ""} // Ensure it reads from state
              onChange={(e) =>
                setResumeData({ ...resumeData, github: e.target.value })
              }
            />
          </label>
        </div>
        {/* Summary */}
        <label className="block">
          <span className="text-gray-700 font-medium">Summary</span>
          <div className="border p-4 rounded-lg bg-blue-50">
            <button
              onClick={() => setShowAiSuggestions(!showAiSuggestions)}
              className="w-full flex justify-between items-center text-blue-800 font-bold text-lg"
            >
              <span className="flex items-center gap-2">
                <FaLightbulb /> AI-Powered Suggestions
              </span>
              {showAiSuggestions ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {showAiSuggestions && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mt-1 mb-2">
                  Get smart suggestions for your summary and experience based on
                  your job title.
                </p>
                <button
                  onClick={fetchAiSuggestions}
                  className={`w-full text-white py-2 rounded-lg transition text-sm ${
                    isLoadingAi
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isLoadingAi}
                >
                  {isLoadingAi ? "Generating..." : "Generate Suggestions"}
                </button>
                {aiSuggestions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2">
                      Suggestions:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {aiSuggestions.map((suggestion, idx) => (
                        <li
                          key={idx}
                          className="p-2 bg-white rounded-md flex items-center justify-between border"
                        >
                          <span>{suggestion}</span>
                          <button
                            onClick={() =>
                              setResumeData({
                                ...resumeData,
                                summary: suggestion,
                              })
                            }
                            className="text-green-500 hover:text-green-700 font-semibold text-xs ml-2"
                          >
                            Use
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <textarea
            rows="4"
            placeholder="A short professional summary..."
            className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={resumeData.summary}
            onChange={(e) =>
              setResumeData({ ...resumeData, summary: e.target.value })
            }
          ></textarea>
        </label>
        {/* Experience Section */}
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FaBriefcase /> Experience
            </span>
            <button
              onClick={addExperience}
              className="text-blue-500 text-sm font-normal hover:underline flex items-center gap-1"
            >
              <FaPlus /> Add
            </button>
          </h3>
          {resumeData.experience.map((exp, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-blue-500 relative"
            >
              <button
                onClick={() => deleteExperience(idx)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>
              <input
                type="text"
                placeholder="Role"
                className="w-full border p-2 rounded mb-2"
                value={exp.role}
                onChange={(e) => {
                  const newExp = [...resumeData.experience];
                  newExp[idx].role = e.target.value;
                  setResumeData({ ...resumeData, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Company"
                className="w-full border p-2 rounded mb-2"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...resumeData.experience];
                  newExp[idx].company = e.target.value;
                  setResumeData({ ...resumeData, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Location (City, State/Country)"
                className="w-full border p-2 rounded mb-2"
                value={exp.location}
                onChange={(e) => {
                  const newExp = [...resumeData.experience];
                  newExp[idx].location = e.target.value;
                  setResumeData({ ...resumeData, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Start Date"
                className="w-full border p-2 rounded mb-2"
                value={exp.startDate}
                onChange={(e) => {
                  const newExp = [...resumeData.experience];
                  newExp[idx].startDate = e.target.value;
                  setResumeData({ ...resumeData, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="End Date"
                className="w-full border p-2 rounded mb-2"
                value={exp.endDate}
                onChange={(e) => {
                  const newExp = [...resumeData.experience];
                  newExp[idx].endDate = e.target.value;
                  setResumeData({ ...resumeData, experience: newExp });
                }}
              />
              <textarea
                rows="2"
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={exp.description}
                onChange={(e) => {
                  const newExp = [...resumeData.experience];
                  newExp[idx].description = e.target.value;
                  setResumeData({ ...resumeData, experience: newExp });
                }}
              ></textarea>
            </div>
          ))}
        </div>
        {/* Education Section */}
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FaGraduationCap /> Education
            </span>
            <button
              onClick={addEducation}
              className="text-blue-500 text-sm font-normal hover:underline flex items-center gap-1"
            >
              <FaPlus /> Add
            </button>
          </h3>
          {resumeData.education.map((edu, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-green-500 relative space-y-2"
            >
              <button
                onClick={() => deleteEducation(idx)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>

              {/* Input: School/University */}
              <input
                type="text"
                placeholder="School/University"
                className="w-full border p-2 rounded"
                value={edu.school}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].school = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* Input: Degree */}
              <input
                type="text"
                placeholder="Degree"
                className="w-full border p-2 rounded"
                value={edu.degree}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].degree = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* NEW INPUT: Marks/GPA */}
              <input
                type="text"
                placeholder="GPA or Percentage (e.g., 3.8/4.0 or 85%)"
                className="w-full border p-2 rounded"
                value={edu.marks}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].marks = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* NEW INPUT: Location */}
              <input
                type="text"
                placeholder="Location (e.g., Mumbai, India)"
                className="w-full border p-2 rounded"
                value={edu.location}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].location = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              />

              {/* Date Range Group */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Start Date"
                  className="w-1/2 border p-2 rounded"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].startDate = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />
                <input
                  type="text"
                  placeholder="End Date"
                  className="w-1/2 border p-2 rounded"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEdu = [...resumeData.education];
                    newEdu[idx].endDate = e.target.value;
                    setResumeData({ ...resumeData, education: newEdu });
                  }}
                />
              </div>

              {/* Input: Description */}
              <textarea
                rows="2"
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={edu.description}
                onChange={(e) => {
                  const newEdu = [...resumeData.education];
                  newEdu[idx].description = e.target.value;
                  setResumeData({ ...resumeData, education: newEdu });
                }}
              ></textarea>
            </div>
          ))}
        </div>
        {/* Skills Section */}
        <div>
          <h3 className="font-semibold text-gray-800">
            <span className="flex items-center gap-2">
              <FaBolt /> Skills
            </span>
          </h3>
          <div className="mt-2 space-y-2">
            <select
              className="w-full border p-2 rounded mt-1"
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
            >
              <option value="Technical">Technical</option>
              <option value="Soft">Soft</option>
              <option value="Languages">Languages</option>
              {Object.keys(resumeData.skills).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Add new category (e.g., Databases)..."
              className="w-full border p-2 rounded"
              value={newSkillCategoryInput}
              onChange={(e) => setNewSkillCategoryInput(e.target.value)}
              onBlur={() => {
                if (newSkillCategoryInput.trim()) {
                  setNewSkillCategory(newSkillCategoryInput.trim());
                  setNewSkillCategoryInput("");
                }
              }}
            />
          </div>
          <div className="flex gap-2 mb-2 mt-2">
            <input
              type="text"
              placeholder="Add new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSkill();
                }
              }}
              className="flex-1 border p-2 rounded"
            />
            <button
              onClick={addSkill}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition text-sm"
            >
              Add
            </button>
          </div>
          {Object.entries(resumeData.skills).map(([category, skills]) => (
            <div key={category} className="mt-4">
              <h4 className="font-bold">{category}</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button
                      onClick={() => deleteSkill(category, idx)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Certifications Section */}
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FaIdCard /> Certifications
            </span>
            <button
              onClick={addCertification}
              className="text-blue-500 text-sm font-normal hover:underline flex items-center gap-1"
            >
              <FaPlus /> Add
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-purple-500">
            <input
              type="text"
              placeholder="Certification Name"
              className="w-full border p-2 rounded mb-2"
              value={newCertification.name}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  name: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="Issuing Authority"
              className="w-full border p-2 rounded mb-2"
              value={newCertification.authority}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  authority: e.target.value,
                })
              }
            />
            <input
              type="url"
              placeholder="Certification Link (Optional)"
              className="w-full border p-2 rounded mb-2"
              value={newCertification.link}
              onChange={(e) =>
                setNewCertification({
                  ...newCertification,
                  link: e.target.value,
                })
              }
            />
          </div>
          {resumeData.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-purple-100 p-2 rounded mt-2 flex justify-between items-center text-sm"
            >
              <span>
                <strong>{cert.name}</strong> - {cert.authority}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    <FaExternalLinkAlt className="inline-block" /> View
                  </a>
                )}
              </span>
              <button
                onClick={() => deleteCertification(idx)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        {/* Projects Section */}
        <div>
          <h3 className="font-semibold text-gray-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FaCode /> Projects
            </span>
            <button
              onClick={addProject}
              className="text-blue-500 text-sm font-normal hover:underline flex items-center gap-1"
            >
              <FaPlus /> Add
            </button>
          </h3>
          <div className="bg-gray-50 p-4 rounded mt-2 border-l-4 border-orange-500">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full border p-2 rounded mb-2"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />
            <textarea
              rows="2"
              placeholder="Description (e.g., A full-stack web app using React, Node.js, and MongoDB to manage tasks.)"
              className="w-full border p-2 rounded mb-2"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            ></textarea>
            <input
              type="url"
              placeholder="Project Link (Optional)"
              className="w-full border p-2 rounded mb-2"
              value={newProject.link}
              onChange={(e) =>
                setNewProject({ ...newProject, link: e.target.value })
              }
            />
          </div>
          {resumeData.projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-orange-100 p-2 rounded mt-2 flex justify-between items-center text-sm"
            >
              <span>
                <strong>{project.name}</strong>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-2"
                  >
                    <FaExternalLinkAlt className="inline-block" /> View
                  </a>
                )}
              </span>
              <button
                onClick={() => deleteProject(idx)}
                className="text-red-500 hover:text-red-700 ml-2"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        {/* Appearance Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">📄 Template</h3>
            <select
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.template}
              onChange={(e) =>
                setResumeData({ ...resumeData, template: e.target.value })
              }
            >
              <option value="professional">Professional</option>
              <option value="modern">Modern</option>
              <option value="minimalist">Minimalist</option>
              <option value="executive">Executive</option>
              <option value="creative">Creative</option>
              <option value="classic">Classic</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">🔤 Font</h3>
            <select
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={resumeData.font}
              onChange={(e) =>
                setResumeData({ ...resumeData, font: e.target.value })
              }
            >
              {["Arial", "Georgia", "Courier New", "Roboto", "Poppins"].map(
                (f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        {/* Color Picker */}
        <div>
          <h3 className="font-semibold text-gray-800">🎨 Theme Color</h3>
          <input
            type="color"
            className="w-full h-10 border rounded mt-1 cursor-pointer"
            value={resumeData.color}
            onChange={(e) =>
              setResumeData({ ...resumeData, color: e.target.value })
            }
          />
        </div>
        <button
          onClick={downloadPDF}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition mt-4 flex items-center justify-center gap-2 font-semibold"
        >
          <FaDownload /> Download PDF
        </button>
      </div>
      {/* --- Right Side: Live Preview --- */}
      <div
        ref={previewRef}
        className="w-full md:w-1/2 p-4 md:p-6 bg-white rounded-xl shadow-lg overflow-y-auto"
        style={{
          fontFamily: resumeData.font,
          borderTop: `8px solid ${resumeData.color}`,
        }}
      >
        <TemplateComponent resumeData={resumeData} />
      </div>
    </div>
  );
};

export default ResumeEditor;
