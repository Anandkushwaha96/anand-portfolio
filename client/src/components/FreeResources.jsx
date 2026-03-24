import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaYoutube, FaChalkboardTeacher, FaBook, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

const FreeResources = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'YouTube', 'Courses', 'Books', 'Documentation'];
  
  const resources = [
    {
      title: 'SQL for Data Analytics',
      provider: 'freeCodeCamp',
      category: 'YouTube',
      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      description: 'Complete SQL course with hands-on projects. Learn joins, subqueries, and advanced SQL concepts.',
      duration: '4 hours',
      level: 'Beginner to Advanced',
      rating: 4.8,
      icon: FaYoutube,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Python for Data Science',
      provider: 'Coursera (Free Audit)',
      category: 'Courses',
      url: 'https://www.coursera.org/learn/python-for-applied-data-science-ai',
      description: 'Learn Python programming and data analysis with pandas and numpy. Free to audit.',
      duration: '4 weeks',
      level: 'Beginner',
      rating: 4.7,
      icon: FaChalkboardTeacher,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Power BI Tutorial',
      provider: 'Microsoft Learn',
      category: 'Courses',
      url: 'https://learn.microsoft.com/en-us/power-bi/',
      description: 'Official Microsoft Power BI learning path with hands-on labs.',
      duration: 'Self-paced',
      level: 'All Levels',
      rating: 4.9,
      icon: FaChalkboardTeacher,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Excel for Data Analysis',
      provider: 'ExcelIsFun YouTube',
      category: 'YouTube',
      url: 'https://www.youtube.com/user/ExcelIsFun',
      description: 'Comprehensive Excel tutorials from basics to advanced data analysis.',
      duration: '100+ hours',
      level: 'All Levels',
      rating: 4.9,
      icon: FaYoutube,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Python Data Science Handbook',
      provider: 'Jake VanderPlas',
      category: 'Books',
      url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
      description: 'Free online book covering NumPy, Pandas, Matplotlib, and Scikit-Learn.',
      duration: '400 pages',
      level: 'Intermediate',
      rating: 4.8,
      icon: FaBook,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'MySQL Documentation',
      provider: 'MySQL Official',
      category: 'Documentation',
      url: 'https://dev.mysql.com/doc/',
      description: 'Complete MySQL documentation with tutorials and reference guides.',
      duration: 'Reference',
      level: 'All Levels',
      rating: 4.7,
      icon: FaBook,
      color: 'from-cyan-500 to-cyan-600'
    }
  ];
  
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            📚 Free Learning Resources
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Curated collection of high-quality free resources to help you learn data analytics and programming
          </p>
          <div className="mt-4 text-sm text-purple-400">
            ⭐ All resources are 100% free and legal
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'All Resources' : cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Resources Grid */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`bg-gradient-to-r ${resource.color} rounded-lg p-3`}>
                    <resource.icon className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-purple-400">{resource.provider}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                    ⏱️ {resource.duration}
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                    📊 {resource.level}
                  </span>
                  <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-yellow-500">
                    ⭐ {resource.rating}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 capitalize">{resource.category}</span>
                  <span className="inline-flex items-center gap-2 text-purple-500 group-hover:translate-x-1 transition-transform">
                    Access Resource
                    <FaExternalLinkAlt size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No resources found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FreeResources;