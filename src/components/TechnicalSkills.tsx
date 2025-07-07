
import React from 'react';
import { Monitor, Server, Code } from 'lucide-react';
import { Interface } from 'readline';
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'

interface SkillItem {
  name: string
  icon: string
  level: string
}

interface Skills {
  category: string,
  items: SkillItem[]
}
interface TechnicalSkillsProps {
  skills: Skills[];
}

const TechnicalSkills: React.FC<TechnicalSkillsProps> = ({ skills }) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Beginner': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getLevelBars = (level: string) => {
    const bars = level === 'Advanced' ? 3 : level === 'Intermediate' ? 2 : 1;
    return (
      <div className="flex space-x-1 mt-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-1 rounded-full ${i < bars ? 'bg-orange-400' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  const containerColor = {
    "Front-End": "rounded-3xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300",
    "Back-End": "rounded-3xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300",
    "Programming Languages": "rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
  }

  const getIconComponent = (iconData) => {
    if (!iconData || !iconData.library || !iconData.name) return null;

    let IconComponent = null;
    switch (iconData.library) {
      case 'fa':
        IconComponent = FaIcons[`Fa${iconData.name}`]; // Contoh: FaReact
        break;
      case 'si':
        IconComponent = SiIcons[`Si${iconData.name}`]; // Contoh: SiRedux
        break;
      // Tambahkan case lain untuk library ikon yang berbeda
      default:
        break;
    }
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies I work with on a daily basis
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {skills.map((skill, index) => (<div key={index} className={`${containerColor[skill.category]}`}>
            <div className="mb-8 flex items-center">
              <div className="rounded-2xl bg-orange-500/20 p-4">
                {skill.category == 'Front-End' ? <Monitor className="h-8 w-8 text-orange-400" /> : skill.category == 'Back-End' ? <Server className="h-8 w-8 text-orange-400" /> : <Code className="h-8 w-8 text-orange-400" />}
              </div>
              <h3 className="ml-4 text-2xl font-bold text-white">{skill.category}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {skill.items.map((item, index) => (
                <div key={index} className="group flex flex-col p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl">{getIconComponent(item.icon)}</div>
                    <span className={`text-xs font-medium ${getLevelColor(item.level)}`}>
                      {item.level}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-orange-300 text-center mb-2">{item.name}</span>
                  {getLevelBars(item.level)}
                </div>
              ))}
            </div>
          </div>)
          )}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
