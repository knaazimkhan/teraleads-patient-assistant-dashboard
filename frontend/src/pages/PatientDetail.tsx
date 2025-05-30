"use client";

import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ArrowLeft, Edit, Phone, Mail, Calendar, MapPin } from "lucide-react";

import LoadingSpinner from "../components/LoadingSpinner";

import { patientApi } from "../services/patient";

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const patientId = Number.parseInt(id || "0");

  const { data: patient, isLoading } = useQuery(
    ["patient", patientId],
    () => patientApi.getById(patientId),
    {
      enabled: !!patientId,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (!patient?.data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Patient not found</h2>
        <Link
          to="/patients"
          className="text-blue-600 hover:text-blue-500 mt-4 inline-block"
        >
          Back to patients
        </Link>
      </div>
    );
  }

  const patientData = patient.data;

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/patients"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to patients
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {patientData.first_name} {patientData.last_name}
            </h1>
            <p className="text-sm text-gray-600">Patient Details</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Edit className="h-4 w-4 mr-2" />
            Edit Patient
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Contact Information
          </h3>
          <div className="space-y-3">
            {patientData.email && (
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-900">
                  {patientData.email}
                </span>
              </div>
            )}
            {patientData.phone && (
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-900">
                  {patientData.phone}
                </span>
              </div>
            )}
            {patientData.date_of_birth && (
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm text-gray-900">
                  {new Date(patientData.date_of_birth).toLocaleDateString()}
                </span>
              </div>
            )}
            {patientData.address && (
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-sm text-gray-900">
                  {patientData.address}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Medical History
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Medical Conditions
              </h4>
              <p className="text-sm text-gray-900 mt-1">
                {patientData.medical_history || "No medical history recorded"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Allergies</h4>
              <p className="text-sm text-gray-900 mt-1">
                {patientData.allergies || "No known allergies"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Emergency Contact
              </h4>
              <p className="text-sm text-gray-900 mt-1">
                {patientData.emergency_contact ||
                  "No emergency contact provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Dental History */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Dental History
          </h3>
          <p className="text-sm text-gray-900">
            {patientData.dental_history || "No dental history recorded"}
          </p>
        </div>
      </div>
    </div>
  );
}
