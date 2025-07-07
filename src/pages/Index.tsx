
import React, { useEffect } from 'react';
import { Code } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import WorkExperience from '@/components/WorkExperience';
import TechnicalSkills from '@/components/TechnicalSkills';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ScrollReveal from '@/components/ScrollReveal';
import ChatBubble from '@/components/ChatBubble';
import SkeletonLoader from '@/components/SkeletonLoader';
import { useProfile, useProjects, useSkills, useExperience, useMatrix } from '@/lib/api';

const Index = () => {
  const { data: profileData, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useProjects();
  const { data: skillsData, isLoading: skillsLoading, error: skillsError } = useSkills();
  const { data: experienceData, isLoading: experienceLoading, error: experienceError } = useExperience();
  const { data: matrixData, isLoading: matrixLoading, error: matrixError } = useMatrix();

  if (profileLoading || projectsLoading || skillsLoading || experienceLoading || matrixLoading) {
    return <SkeletonLoader />;
  }

  if (profileError || projectsError || skillsError || experienceError) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error loading data.</div>;
  }

  const portfolioData = {
    name: profileData?.name || "",
    title: profileData?.title || "",
    description: profileData?.description || "",
    contact: profileData?.contact || { email: profileData.email, phone: profileData.phone, github: profileData.htmlUrl, linkedin: profileData.linkedin, portofolio: profileData.portofolioUrl },
    work_experiences: Array.isArray(experienceData) ? experienceData : [],
    education: experienceData?.education || { institution: "", degree: "", year: 0, gpa: 0 },
    certifications: Array.isArray(experienceData?.certifications) ? experienceData.certifications : [],
    skills: Array.isArray(skillsData) ? skillsData : [],
    projects: Array.isArray(projectsData) ? projectsData : [],
  };
  
  console.log(portfolioData)
  return (
    <div className="min-h-screen text-white">
      <HeroSection portfolioData={portfolioData} />

      <ScrollReveal>
        <StatsSection matrixData={matrixData} />
      </ScrollReveal>

      <ScrollReveal direction="left" delay={0.2}>
        <WorkExperience experiences={portfolioData.work_experiences} />
      </ScrollReveal>

      <ScrollReveal direction="right" delay={0.1}>
        <TechnicalSkills skills={portfolioData.skills} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <ProjectsSection projects={portfolioData.projects} />
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.2}>
        <ContactSection contact={portfolioData.contact} name={portfolioData.name} />
      </ScrollReveal>

      {/* Floating Chat Bubble */}
      <ChatBubble />
    </div>
  );
};

export default Index;
