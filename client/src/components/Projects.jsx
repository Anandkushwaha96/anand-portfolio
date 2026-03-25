import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaTimes, FaChartLine, FaDatabase, FaUsers } from 'react-icons/fa';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const categories = ['all', 'Power BI', 'SQL', 'Excel', 'Python'];
  
  const projects = [
    {
      title: 'Netflix Data Analysis',
      description: 'Performed end-to-end EDA on Netflix dataset using Python ,Pandas.Identified trends in content type, genre distribution, and country-wise production.Built visualizations to highlight yearly growth and audience insights.',
      tech: ['Python', 'Pandas'],
      category: 'Python',
      github: 'https://github.com/Anandkushwaha96/Netflix-Data-Analysis-main.git',
      date: 'Jan 2026',
      impact: 'Trend & Pattern Insights',
      dataSize: '8800+ Titles',
      metrics: ['Genre Analysis: 20+ Genres', 'Content Distribution:Movie Vs Tv Shows', 'Year-wise Growth Trends']
    },
    {
      title: 'Business Insight 360',
      description: 'Designed a multi-view dashboard in Power BI for finance, supply chain, and executive management. Transformed over 1.8 million records and enhanced report efficiency by 30%.',
      tech: ['Power BI', 'MySQL', 'Excel', 'DAX Studio'],
      category: 'Power BI',
      github: 'https://github.com/Anandkushwaha96/Business-Insight-360-Brick-Mortar-and-E-Commerce.git',
      date: 'Nov 2025',
      impact: '30% Efficiency Boost',
      dataSize: '1.8M Records',
      metrics: ['Efficiency: +30%', 'Performance: +10%', 'Departments: 3']
    },
    {
      title: 'Hospitality Analysis',
      description: 'Developed Power BI dashboard for hotel chain to analyze revenue trends and industry presence. Helped revenue team gain valuable insights aiming to regain 20% revenue and industry presence.',
      tech: ['Power BI', 'Excel'],
      category: 'Power BI',
      github: 'https://github.com/Anandkushwaha96/Power-BI_AtliQ-Hospitality.git',
      live: 'https://tinyurl.com/anandku23',
      date: 'Dec 2025',
      impact: '20% Revenue Target',
      dataSize: '3 Months Data',
      metrics: ['Revenue Target: +20%', 'Industry Presence: +20%', 'Dashboard Views: 5']
    },
    {
      title: 'P&L Report',
      description: 'Generated detailed P&L report using advanced Excel features across 1.8 million records. Automated data cleansing saving 4 hours of manual effort and improved user experience.',
      tech: ['Excel', 'Power Query', 'DAX', 'Pivot Tables'],
      category: 'Excel',
      github: 'https://github.com/Anandkushwaha96/-Excel-Sales-and-Finance-Analytics-Project-of-AtliQ-Hardwares.git',
      date: 'Jan 2026',
      impact: '4 Hours Saved',
      dataSize: '1.8M Records',
      metrics: ['Time Saved: 4h/week', 'Automation: 100%', 'User Experience: Improved']
    }
  ];
  
  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4">Some of my best work</p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.title}
              className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-purple-500">{project.date}</span>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                {/* Impact Badges */}
                <div className="flex gap-2 mb-4">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                    📊 {project.impact}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                    💾 {project.dataSize}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub />
                    Github Repository
                  </a>
                  {/* Only show Live Demo for Hospitality Analysis */}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-500 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt />
                      Live Dashboard
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-white">{selectedProject.title}</h3>
                  <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white">
                    <FaTimes size={24} />
                  </button>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <FaChartLine className="text-purple-500 text-2xl mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Impact</p>
                    <p className="text-white font-semibold">{selectedProject.impact}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <FaDatabase className="text-purple-500 text-2xl mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Data Size</p>
                    <p className="text-white font-semibold">{selectedProject.dataSize}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <FaUsers className="text-purple-500 text-2xl mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Stakeholders</p>
                    <p className="text-white font-semibold">Executive Team</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Metrics</h4>
                  <div className="space-y-2">
                    {selectedProject.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-purple-500 transition-colors">
                    Github Repository
                  </a>
                  {/* Only show Live Dashboard button in modal for Hospitality Analysis */}
                  {selectedProject.live && (
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all">
                      Live Dashboard
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;