
import React from 'react';
import { Code, Clock, Users, Server } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const CountUpAnimation: React.FC<{ value: string; isVisible: boolean }> = ({ value, isVisible }) => {
  const [count, setCount] = React.useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;

  React.useEffect(() => {
    if (isVisible && numericValue > 0) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, numericValue]);

  return <span>{count}{value.includes('+') ? '+' : ''}</span>;
};

interface StatsSectionProps {
  matrixData: {
    projectsCompleted: string;
    hoursOfCoding: string;
    teamCollaborations: number;
    backendApisBuilt: number;
  };
}

const StatsSection: React.FC<StatsSectionProps> = ({ matrixData }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { icon: Code, value: matrixData.projectsCompleted, label: "Projects Completed", color: "text-orange-400" },
    { icon: Clock, value: matrixData.hoursOfCoding, label: "Hours of Coding", color: "text-purple-400" },
    { icon: Users, value: matrixData.teamCollaborations.toString(), label: "Team Collaborations", color: "text-blue-400" },
    { icon: Server, value: matrixData.backendApisBuilt.toString(), label: "Backend APIs Built", color: "text-green-400" },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                <CountUpAnimation value={stat.value} isVisible={inView} />
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
