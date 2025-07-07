import { Github, ExternalLink, AlertTriangle, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ScrollReveal from '@/components/ScrollReveal';
import { useProjects } from '@/lib/api';

const ProjectSkeleton = () => (
  <div className="group rounded-3xl bg-gray-900/50 border border-gray-800 overflow-hidden transition-all duration-300">
    <div className="relative aspect-video bg-gradient-to-br from-orange-500/20 to-purple-500/20 overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="p-8">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { data: projects, isLoading, isError } = useProjects();

  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="container relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              My{' '}
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              A selection of my work, showcasing my skills and passion for development.
            </p>
          </div>
        </ScrollReveal>

        {isError && (
          <div className="flex flex-col items-center justify-center text-center text-red-400 bg-red-500/10 p-8 rounded-lg">
            <AlertTriangle className="h-12 w-12 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Failed to Load Projects</h2>
            <p>There was an error fetching the project data. Please try again later.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <ProjectSkeleton key={index} />)
            : projects?.map((project: any, index: number) => (
                <ScrollReveal key={project.title} delay={index * 0.1}>
                  <div className="group rounded-3xl bg-gray-900/50 border border-gray-800 overflow-hidden transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 hover:border-orange-500/50 h-full flex flex-col">
                    <div className="relative aspect-video bg-gradient-to-br from-orange-500/20 to-purple-500/20 overflow-hidden">
                      <img
                        src={project.imageUrls && project.imageUrls.length > 0 ? project.imageUrls[0] : '/placeholder.svg'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* You can add project.stats here if your API provides it */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-300 mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags?.map((tag: string) => (
                          <span key={tag} className="rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;