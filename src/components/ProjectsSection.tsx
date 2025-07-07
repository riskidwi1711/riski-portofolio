
import React, { useEffect, useState } from 'react';
import { ArrowRight, ExternalLink, Github, Star, Users } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  language: string;
  htmlUrl: string;
  imageUrls: string[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // Number of projects to display per page

  const categories = [];
  projects.forEach((p) => {
    if (p.language && !categories.includes(p.language)) {
      categories.push(p.language);
    }
  });
  
  const projectImages = [
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop", // Flight booking
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop", // Todo/Kanban
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop", // Kanban
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop", // E-commerce
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop", // E-commerce
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop", // Blog
  ];

  const projectStats = [
    "🚀 Live & Active",
    "🔥 100+ Users",
    "⚡ Scalable Architecture",
    "🛒 E-commerce Ready",
    "💰 Revenue Generator",
    "📝 Content Management"
  ];

  const enhancedProjects = projects.map((project, index) => ({
    ...project,
    image: project.imageUrls.length > 0 ? project.imageUrls[0] : projectImages[0],
    stats: projectStats[index] || "⭐ Featured Project"
  }));

  const filteredProjects = activeFilter === 'All' 
    ? enhancedProjects 
    : enhancedProjects.filter(project => 
        project.language == activeFilter
      );

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Real-world applications built with modern technologies
          </p>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-orange-500 text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project, index) => (
            <div key={index} className="group rounded-3xl bg-gray-900/50 border border-gray-800 overflow-hidden transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 hover:border-orange-500/50">
              <div className="relative aspect-video bg-gradient-to-br from-orange-500/20 to-purple-500/20 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
                    {project.stats}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                   <span className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-300">
                      {project.language}
                    </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-12 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentPage === i + 1
                  ? 'bg-orange-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
