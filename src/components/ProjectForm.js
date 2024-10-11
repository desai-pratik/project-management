import React, { useState, useEffect } from "react";

const ProjectForm = ({ addProject, projectToEdit, updateProject }) => {
  const [projectName, setProjectName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (projectToEdit) {
      setProjectName(projectToEdit.name);
      setDueDate(projectToEdit.dueDate);
      setStatus(projectToEdit.status);
      setPaidAmount(projectToEdit.payment.amount);
    }
  }, [projectToEdit]);

  const validate = () => {
    let formErrors = {};
    const today = new Date().toISOString().split("T")[0];
    if (!projectName) {
      formErrors.projectName = "Project Name is required";
    } else if (projectName.length < 3) {
      formErrors.projectName = "Project Name must be at least 3 characters long";
    }
    if (!dueDate) {
      formErrors.dueDate = "Due Date is required";
    } else if (dueDate <= today) {
      formErrors.dueDate = "Due Date must be in the future";
    }
    if (!paidAmount) {
      formErrors.paidAmount = "Paid Amount is required";
    } else if (isNaN(paidAmount) || paidAmount <= 0) {
      formErrors.paidAmount = "Paid Amount must be a positive number";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newProject = {
        name: projectName,
        dueDate,
        status,
        payment: {
          amount: parseFloat(paidAmount),
          status: "unpaid",
        },
      };

      if (projectToEdit) {
        updateProject(projectToEdit.id, newProject);
      } else {
        addProject(newProject);
      }
      setProjectName("");
      setDueDate("");
      setStatus("Active");
      setPaidAmount("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          className={`border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.projectName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.dueDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Paid Amount</label>
        <input
          type="number"
          value={paidAmount}
          onChange={(e) => setPaidAmount(e.target.value)}
          placeholder="Enter paid amount"
          className={`border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.paidAmount ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.paidAmount && <p className="text-red-500 text-sm mt-1">{errors.paidAmount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Project Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
        >
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300">
        {projectToEdit ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
