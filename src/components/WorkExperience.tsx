
import React from 'react';
import { Calendar, CheckCircle, Code, Building } from 'lucide-react';
import { parseDate } from '@/lib/utils';

interface WorkExperienceProps {
  experiences: {
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: [];
  }[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ experiences }) => {
  console.log(experiences)
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey in software development
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-purple-500 sm:left-1/2 sm:-ml-px"></div>
          
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-purple-500 sm:left-1/2 sm:-ml-6">
                  <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                    <Building className="h-3 w-3 text-black" />
                  </div>
                </div>
                
                {/* Content card */}
                <div className={`ml-20 w-full sm:ml-0 ${index % 2 === 0 ? 'sm:w-5/12 sm:pr-12' : 'sm:w-5/12 sm:pl-12'}`}>
                  <div className="group rounded-3xl bg-gray-900/50 p-8 backdrop-blur-sm border border-gray-800 transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 hover:border-orange-500/50">
                    <div className="mb-6">
                      <div className="mb-3 inline-flex items-center rounded-full bg-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300">
                        <Calendar className="mr-2 h-4 w-4" />
                        {parseDate(experience.startDate)} - {parseDate(experience.endDate)}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                      <p className="text-xl text-orange-300 font-semibold mb-4">{experience.company}</p>
                    </div>
                    <ul className="space-y-3">
                      {experience.description.map((responsibility, respIndex) => (
                        <li key={respIndex} className="flex items-start text-gray-300">
                          <CheckCircle className="mr-3 mt-0.5 h-5 w-5 text-green-400 flex-shrink-0" />
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
