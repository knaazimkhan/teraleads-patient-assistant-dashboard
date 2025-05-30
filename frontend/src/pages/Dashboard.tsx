import { useQuery } from "react-query";
import { Users, MessageSquare, Calendar, TrendingUp } from "lucide-react";

import LoadingSpinner from "../components/LoadingSpinner";

import { patientApi } from "../services/patient";

import type { Patient } from "../types";

export default function Dashboard() {
  const { data: patients, isLoading } = useQuery("patients", () =>
    patientApi.getAll()
  );

  if (isLoading) return <LoadingSpinner />;

  const patientCount = patients?.data?.length || 0;
  const recentPatients = patients?.data?.slice(0, 5) || [];

  const stats = [
    {
      name: "Total Patients",
      value: patientCount.toString(),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "AI Conversations",
      value: "24",
      icon: MessageSquare,
      color: "bg-green-500",
    },
    {
      name: "Appointments Today",
      value: "8",
      icon: Calendar,
      color: "bg-yellow-500",
    },
    {
      name: "Patient Satisfaction",
      value: "98%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your dental clinic management system
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} rounded-md p-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Patients */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Recent Patients
          </h3>
          {recentPatients.length > 0 ? (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentPatients.map((patient: Patient) => (
                  <li key={patient.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {patient.first_name[0]}
                            {patient.last_name[0]}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {patient.first_name} {patient.last_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {patient.email}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">
              No patients yet. Add your first patient!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
