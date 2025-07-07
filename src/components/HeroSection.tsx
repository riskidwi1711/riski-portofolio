
import React, { useEffect } from 'react';
import { Mail, Github, ArrowRight, Zap, Star, Briefcase } from 'lucide-react';

interface HeroSectionProps {
  portfolioData: {
    name: string;
    title: string;
    description: string;
    contact: {
      email: string;
      phone: string;
      github: string;
      linkedin: string;
      portofolio: string;
    };
    work_experiences: WorkExperience[];
    education: Education;
    certifications: Certification[];
    skills: Skills[];
    projects: Project[];
  };
}


interface SkillItem{
  name: string
}

interface Skills{
  category: string,
  items: SkillItem[]
}
interface TechnicalSkillsProps {
  skills: Skills[];
}

interface WorkExperience {
  company: string;
  role: string;
  duration: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  title: string;
  description: string;
  url: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ portfolioData }) => {

  useEffect(()=>{
    console.log(portfolioData)
  },[portfolioData])

  return (
    <section className="-mt-16 relative overflow-hidden px-4 pt-36 pb-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-2 text-sm font-medium text-orange-300 backdrop-blur-sm hover:scale-105 transition-transform">
              <Zap className="mr-2 h-4 w-4" />
              🚀 2+ Years Experience
            </div>
            <div className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-sm hover:scale-105 transition-transform">
              <Briefcase className="mr-2 h-4 w-4" />
              💼 Open for Freelance & Remote Work
            </div>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
              {portfolioData.name.split(' ')[0]}
            </span>
          </h1>

          <p className="mb-4 text-2xl font-medium text-orange-300 sm:text-3xl">
            Backend Developer | Fullstack Engineer | Fast Learner
          </p>

          <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-300 sm:text-xl leading-relaxed">
            {portfolioData.description} I build scalable applications with clean, maintainable code.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href={`mailto:${portfolioData.contact.email}`}
              className="group inline-flex items-center rounded-full bg-orange-500 px-8 py-4 text-base font-medium text-black transition-all duration-200 hover:bg-orange-400 hover:scale-105"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={portfolioData.contact.portofolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-gray-600 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:scale-105"
            >
              <Github className="mr-2 h-5 w-5" />
              View Portfolio
            </a>
          </div>

          <p className="mt-6 text-gray-400 text-lg">
            Need a reliable backend dev? Let's talk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
