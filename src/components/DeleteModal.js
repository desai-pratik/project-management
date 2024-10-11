import React from "react";

const DeleteModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null; 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">{message || "Are you sure you want to delete this project?"}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
