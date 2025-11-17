import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaEye, FaDownload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your resumes.");
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Corrected API endpoint
        const response = await axios.get("/api/resumes", config);

        if (Array.isArray(response.data)) {
          setResumes(response.data);
        } else {
          setResumes([]);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load resumes. Please try again later.");
        setLoading(false);
        console.error(
          "Dashboard API Error:",
          err.response?.data || err.message
        );
      }
    };

    fetchResumes();
  }, []);

  const handleCreateNew = () => {
    navigate("/editor");
  };

  // Corrected frontend function to handle resume deletion
  const handleDeleteResume = async (resumeId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/resumes/${resumeId}`, config);
      
      // Update the state to remove the deleted resume from the list
      setResumes(resumes.filter(resume => resume._id !== resumeId));
      toast.success("Resume deleted successfully!");

    } catch (err) {
      toast.error("Failed to delete resume.");
      console.error("Delete Error:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] p-4 text-red-600">
        <p className="text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
            My Resumes
          </h1>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition font-semibold"
          >
            <FaPlus /> Create New Resume
          </button>
        </div>

        {/* Resume List */}
        {resumes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-600">
              No resumes saved yet.
            </h2>
            <p className="text-gray-500 mt-2">
              Start by creating your first resume!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {resume.fullName || "Untitled Resume"}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {resume.title || "No Title"}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Last updated:{" "}
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/editor/${resume._id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
                  >
                    <FaEye /> View/Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteResume(resume._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;