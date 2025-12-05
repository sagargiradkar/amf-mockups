import React from 'react';
import { Package, FileText, GraduationCap, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServiceCards = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'parts',
      title: 'PARTS',
      description: 'Browse and order replacement parts for your equipment',
      icon: Package,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      path: '/parts'
    },
    {
      id: 'documentation',
      title: 'DOCUMENTATION',
      description: 'Access manuals, guides, and technical documentation',
      icon: FileText,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      path: '/documentation'
    },
    {
      id: 'training',
      title: 'TRAINING',
      description: 'Explore training materials and certification programs',
      icon: GraduationCap,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/training'
    },
    {
      id: 'service',
      title: 'SERVICE',
      description: 'Request service support and track maintenance',
      icon: Wrench,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      path: '/service'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              onClick={() => navigate(service.path)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden group"
            >
              <div className={`${service.color} ${service.hoverColor} transition-colors p-6 flex items-center justify-center`}>
                <Icon className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
