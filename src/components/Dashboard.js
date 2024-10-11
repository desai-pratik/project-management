import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import EarningsChart from "./EarningsChart";
import { dummyData } from "../dummyData";
import DeleteModal from "./DeleteModal";

const Dashboard = () => {
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : dummyData;
  });
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null); 

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      payment: {
        amount: project.payment.amount,
        status: "unpaid",
      },
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id, updatedProject) => {
    const updatedProjects = projects.map((project) => (project.id === id ? { ...updatedProject, id } : project));
    setProjects(updatedProjects);
    setProjectToEdit(null);
  };

  const confirmDelete = () => {
    const updatedProjects = projects.filter((proj) => proj.id !== projectToDelete.id);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setShowModal(false);
    setProjectToDelete(null);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setShowModal(true);
  };

  const editProject = (id) => {
    const project = projects.find((project) => project.id === id);
    setProjectToEdit(project);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row mb-8 gap-6">
        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow border">
          <ProjectForm addProject={addProject} projectToEdit={projectToEdit} updateProject={updateProject} />
        </div>

        <div className="w-full md:w-1/2 bg-white p-4 rounded shadow border">
          <EarningsChart projects={projects} />
        </div>
      </div>

      <h2 className="text-xl mb-4">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-bold text-lg">{project.name}</h3>
            <p className="text-gray-600">Due Date: {project.dueDate}</p>
            <p className="text-gray-600">Status: {project.status}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => editProject(project.id)}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded" onClick={() => handleDeleteClick(project)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete the project: ${projectToDelete?.name}?`}
      />
    </div>
  );
};

export default Dashboard;
