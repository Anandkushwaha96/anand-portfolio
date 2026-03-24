import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const skills = [
    { 
      name: 'SQL', 
      level: 90, 
      color: 'from-blue-500 to-blue-600',
      description: 'Complex queries, optimization, joins, CTEs, window functions',
      projects: '5+ projects',
      icon: '🗄️'
    },
    { 
      name: 'Python', 
      level: 85, 
      color: 'from-yellow-500 to-yellow-600',
      description: 'Pandas, NumPy, data cleaning, analysis, visualization',
      projects: '4+ projects',
      icon: '🐍'
    },
    { 
      name: 'Power BI', 
      level: 88, 
      color: 'from-yellow-400 to-yellow-500',
      description: 'DAX, data modeling, interactive dashboards, reports',
      projects: '3+ dashboards',
      icon: '📊'
    },
    { 
      name: 'Excel', 
      level: 85, 
      color: 'from-green-500 to-green-600',
      description: 'Pivot tables, VBA, macros, Power Query, complex formulas',
      projects: '6+ reports',
      icon: '📈'
    },
    { 
      name: 'Pandas', 
      level: 80, 
      color: 'from-blue-400 to-blue-500',
      description: 'Data manipulation, cleaning, aggregation, merging',
      projects: '3+ projects',
      icon: '🐼'
    },
    { 
      name: 'NumPy', 
      level: 80, 
      color: 'from-teal-400 to-teal-500',
      description: 'Numerical computations, arrays, mathematical operations',
      projects: '2+ projects',
      icon: '🔢'
    },
  ];
  
  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4">Technologies and tools I work with</p>
        </div>
        
        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, idx) => (
            <div
              key={skill.name}
              className={`relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{skill.icon}</span>
                <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-purple-500">
                      Proficiency
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-500">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                  <div
                    style={{ width: `${skill.level}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${skill.color} transition-all duration-1000 ${
                      inView ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              </div>
              
              {/* Hover Info */}
              {hoveredSkill === skill.name && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 flex flex-col justify-center animate-fadeIn">
                  <p className="text-gray-300 text-sm mb-2">{skill.description}</p>
                  <p className="text-purple-400 text-xs">📁 {skill.projects}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;