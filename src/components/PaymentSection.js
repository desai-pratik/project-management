import React, { useEffect, useState } from "react";

const PaymentSection = () => {
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const markPaymentAsPaid = (projectId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          payment: { ...project.payment, status: "paid" },
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-bold text-lg">Project: {project.name}</h3>
            <strong className="text-gray-600">Amount: ${project.payment.amount}</strong>
            <p className="text-gray-600">Status: {project.payment.status}</p>
            <p className="text-gray-600">Due Date: {project.dueDate}</p>
            {project.payment.status === "unpaid" && (
              <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={() => markPaymentAsPaid(project.id)}>
                Mark as Paid
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSection;
