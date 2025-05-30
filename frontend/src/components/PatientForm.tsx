"use client";

import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import { patientApi } from "../services/patient";

import type { Patient, PatientFormData } from "../types";

interface PatientFormProps {
  patient?: Patient;
  onClose: () => void;
}

export default function PatientForm({ patient, onClose }: PatientFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!patient;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: patient
      ? {
          ...patient,
          date_of_birth: patient.date_of_birth
            ? new Date(patient.date_of_birth).toISOString().split("T")[0]
            : "",
          email: patient.email || "",
          phone: patient.phone || "",
          address: patient.address || "",
          medical_history: patient.medical_history || "",
          dental_history: patient.dental_history || "",
          allergies: patient.allergies || "",
          emergency_contact: patient.emergency_contact || "",
        }
      : {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          date_of_birth: "",
          address: "",
          medical_history: "",
          dental_history: "",
          allergies: "",
          emergency_contact: "",
        },
  });

  const createMutation = useMutation(patientApi.create, {
    onSuccess: () => {
      queryClient.invalidateQueries("patients");
      toast.success("Patient created successfully");
      onClose();
    },
    onError: () => {
      toast.error("Failed to create patient");
    },
  });

  const updateMutation = useMutation(
    (data: PatientFormData) => patientApi.update(patient!.id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("patients");
        toast.success("Patient updated successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed to update patient");
      },
    }
  );

  const onSubmit = (data: PatientFormData) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal panel */}
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-lg font-medium text-gray-900"
                id="modal-title"
              >
                {isEditing ? "Edit Patient" : "Add New Patient"}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="max-h-96 overflow-y-auto pr-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register("first_name", {
                          required: "First name is required",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.first_name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register("last_name", {
                          required: "Last name is required",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.last_name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        {...register("date_of_birth")}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      {...register("address")}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Medical History
                    </label>
                    <textarea
                      {...register("medical_history")}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any relevant medical conditions, medications, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Dental History
                    </label>
                    <textarea
                      {...register("dental_history")}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Previous dental work, procedures, concerns, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Allergies
                    </label>
                    <textarea
                      {...register("allergies")}
                      rows={2}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any known allergies to medications, materials, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      {...register("emergency_contact")}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Name and phone number"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "Saving..."
                    : isEditing
                    ? "Update Patient"
                    : "Create Patient"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
