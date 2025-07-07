
import { User, Code, Database, Server, Briefcase, GraduationCap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ScrollReveal from '@/components/ScrollReveal';
import { useExperience } from '@/lib/api';

const skills = [
  { icon: Server, name: 'Backend Development', description: 'Building robust and scalable server-side applications.' },
  { icon: Code, name: 'Frontend Development', description: 'Creating responsive and intuitive user interfaces.' },
  { icon: Database, name: 'Database Management', description: 'Designing and optimizing database schemas and queries.' },
];

const JourneySkeleton = () => (
  <div className="mb-12 flex items-center">
    <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
    <div className="ml-6 w-full">
      <Skeleton className="h-4 w-1/4 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-2" />
      <Skeleton className="h-4 w-full" />
    </div>
  </div>
);

const About = () => {
  const { data: experiences, isLoading, isError } = useExperience();

  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="container relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              About{' '}
              <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                Me
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              A passionate developer with a love for creating elegant and efficient solutions.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center mb-20">
          <ScrollReveal delay={0.1} className="lg:col-span-1 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 p-1">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                  <User className="w-24 h-24 sm:w-32 sm:h-32 text-purple-400" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-500/20 rounded-full blur-xl" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">My Philosophy</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              I believe in the power of technology to solve real-world problems. My approach to development is centered around writing clean, maintainable, and scalable code. I thrive in collaborative environments and am always eager to learn new things and take on challenging projects that push my skills to the limit.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Core Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <ScrollReveal key={skill.name} delay={index * 0.1}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <skill.icon className="w-8 h-8 text-orange-400" />
                    <CardTitle className="text-white">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">
                    {skill.description}
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-3xl font-bold text-center text-white mb-12">My Journey</h2>
          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-purple-500" />
            {isLoading ? (
              <>
                <JourneySkeleton />
                <JourneySkeleton />
              </>
            ) : isError ? (
              <div className="text-center text-red-400">
                <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
                <p>Failed to load work experience.</p>
              </div>
            ) : (
              experiences?.map((item: any, index: number) => (
                <ScrollReveal key={item.company + item.role} delay={index * 0.1} className="mb-12">
                  <div className="relative flex items-center">
                    {/* Timeline dot */}
                    <div className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-purple-500">
                      <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                        <Briefcase className="h-3 w-3 text-black" />
                      </div>
                    </div>
                    {/* Content card */}
                    <div className="ml-20 w-full">
                      <div className="group rounded-3xl bg-gray-900/50 p-6 backdrop-blur-sm border border-gray-800 transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 hover:border-orange-500/50">
                        <p className="text-sm text-orange-400 font-semibold">{item.duration}</p>
                        <h3 className="text-xl font-bold text-white mt-1">{item.role} at {item.company}</h3>
                        <p className="text-gray-300 mt-2">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;
