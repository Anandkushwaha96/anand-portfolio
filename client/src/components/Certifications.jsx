import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaCertificate, FaExternalLinkAlt, FaCalendarAlt, FaSearch, FaAward } from 'react-icons/fa';

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIssuer, setFilterIssuer] = useState('all');

  const certifications = [
    {
      title: 'SQL Beginner to Advanced For Data Professionals',
      issuer: 'Udemy',
      date: 'Dec 2025',
      credentialId: 'UC-12345-SQL',
      link: 'https://www.udemy.com/certificate/UC-28ec466e-b81f-4d91-99b2-e208acee6550/',
      skills: ['SQL', 'Database Design', 'Query Optimization', 'Joins', 'Subqueries', 'CTEs'],
      icon: FaCertificate,
      color: 'from-blue-500 to-cyan-500',
      duration: '40 hours',
      level: 'Advanced'
    },
    {
      title: 'Data Analytics From Basics To Advanced',
      issuer: 'Udemy',
      date: 'Mar 2026',
      credentialId: 'UC-67890-DA',
      link: 'https://www.udemy.com/certificate/UC-7acce891-7419-4df5-87e8-32d65ce211bd/',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
      icon: FaCertificate,
      color: 'from-green-500 to-emerald-500',
      duration: '35 hours',
      level: 'Advanced'
    },
    {
      title: 'GeeksForGeeks </> CUTM Training Program',
      issuer: 'GeeksForGeeks',
      date: 'Mar 2026',
      credentialId: 'GFG-CUTM-2026',
      link: 'https://www.geeksforgeeks.org/certificate/9254df5ee42cd446a2c26b6ed0a17d41',
      skills: ['Data Structures', 'Algorithms', 'Problem Solving', 'Competitive Programming'],
      icon: FaAward,
      color: 'from-purple-500 to-pink-500',
  
      level: 'Intermediate'
    },
    /*
    {
      title: 'Power BI Data Analyst Associate',
      issuer: 'Microsoft',
      date: 'Jan 2026',
      credentialId: 'PL-300-2026',
      link: 'https://learn.microsoft.com/en-us/users/username/credentials/PL-300-2026',
      skills: ['Power BI', 'DAX', 'Data Modeling', 'Dashboard Design', 'Power Query'],
      icon: FaCertificate,
      color: 'from-yellow-500 to-orange-500',
      duration: '30 hours',
      level: 'Professional'
    },

    
    {
      title: 'Python for Data Science',
      issuer: 'IBM',
      date: 'Nov 2025',
      credentialId: 'IBM-PYTHON-2025',
      link: 'https://coursera.org/verify/IBM-PYTHON-2025',
      skills: ['Python', 'NumPy', 'Pandas', 'Data Analysis', 'Machine Learning Basics'],
      icon: FaCertificate,
      color: 'from-red-500 to-pink-500',
      duration: '25 hours',
      level: 'Intermediate'
    },
    
    {
      title: 'Advanced Excel - Data Analysis',
      issuer: 'Microsoft',
      date: 'Oct 2025',
      credentialId: 'MS-EXCEL-2025',
      link: 'https://learn.microsoft.com/en-us/users/username/credentials/MS-EXCEL-2025',
      skills: ['Pivot Tables', 'Power Query', 'Advanced Formulas', 'VBA', 'Macros'],
      icon: FaCertificate,
      color: 'from-green-500 to-teal-500',
      duration: '20 hours',
      level: 'Advanced'
    }
      */

  ];

  const issuers = ['all', ...new Set(certifications.map(cert => cert.issuer))];

  const filteredCerts = certifications.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIssuer = filterIssuer === 'all' || cert.issuer === filterIssuer;
    return matchesSearch && matchesIssuer;
  });

  return (
    <section id="certifications" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            📜 My Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Professional certifications that validate my skills and expertise
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {issuers.map(issuer => (
              <button
                key={issuer}
                onClick={() => setFilterIssuer(issuer)}
                className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
                  filterIssuer === issuer
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {issuer === 'all' ? 'All Issuers' : issuer}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCerts.map((cert, idx) => (
            <a
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`bg-gradient-to-r ${cert.color} rounded-lg p-3`}>
                    <cert.icon className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-purple-400">{cert.issuer}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <FaCalendarAlt className="text-purple-500" />
                  <span>Issued: {cert.date}</span>
                  <span className="mx-1">•</span>
                  <span>⏱️ {cert.duration}</span>
                </div>
                
                <div className="mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cert.level === 'Advanced' ? 'bg-purple-500/20 text-purple-400' :
                    cert.level === 'Professional' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {cert.level}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-500">
                      +{cert.skills.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Credential ID: {cert.credentialId}</span>
                  <span className="inline-flex items-center gap-2 text-purple-500 group-hover:translate-x-1 transition-transform text-sm">
                    View Certificate
                    <FaExternalLinkAlt size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No certifications found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;