"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/LoadingSpinner";
import PatientForm from "../components/PatientForm";

import { patientApi } from "../services/patient";

import type { Patient } from "../types";

export default function Patients() {
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: patients, isLoading } = useQuery("patients", () =>
    patientApi.getAll()
  );

  const deleteMutation = useMutation(patientApi.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
      toast.success("Patient deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete patient");
    },
  });

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  const filteredPatients =
    patients?.data?.filter((patient: Patient) =>
      `${patient.first_name} ${patient.last_name} ${patient.email || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your patient records and information
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient: Patient) => (
              <li key={patient.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {patient.first_name[0]}
                          {patient.last_name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600"
                        >
                          {patient.first_name} {patient.last_name}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.email} • {patient.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(patient)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-gray-500">
              {searchTerm
                ? "No patients found matching your search."
                : "No patients yet. Add your first patient!"}
            </li>
          )}
        </ul>
      </div>

      {/* Patient Form Modal */}
      {showForm && (
        <div>
          <PatientForm
            patient={editingPatient || undefined}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
}
