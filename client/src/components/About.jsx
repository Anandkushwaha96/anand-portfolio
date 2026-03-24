import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaDatabase, FaChartLine, FaCode, FaCloud, FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const achievements = [
    { icon: FaDatabase, title: 'Data Processing', value: '1.8M+', desc: 'Records Analyzed' },
    { icon: FaChartLine, title: 'Efficiency', value: '30%', desc: 'Performance Boost' },
    { icon: FaCode, title: 'Projects', value: '5+', desc: 'Completed' },
    { icon: FaCloud, title: 'Cost Reduction', value: '10%', desc: 'Operational Costs' },
  ];

  const certificates = [
    {
      name: 'SQL Beginner to Advanced For Data Professionals',
      issuer: 'Udemy',
      date: 'Dec 2025',
      link: 'https://www.udemy.com/certificate/UC-28ec466e-b81f-4d91-99b2-e208acee6550/',
      icon: FaCertificate,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Data Analytics From Basics To Advanced',
      issuer: 'Udemy',
      date: 'Mar 2026',
      link: 'https://www.udemy.com/certificate/UC-7acce891-7419-4df5-87e8-32d65ce211bd/',
      icon: FaCertificate,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'GeeksForGeeks Training Program',
      issuer: 'GeeksForGeeks - CUTM PKD Campus',
      date: 'Mar 2026',
      link: 'https://www.geeksforgeeks.org/certificate/9254df5ee42cd446a2c26b6ed0a17d41',
      icon: FaCertificate,
      color: 'from-green-500 to-emerald-500'
    }
  ];
  
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Passionate data analyst turning complex data into actionable insights
          </p>
        </div>
        
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">📊 Who Am I?</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                I'm a passionate data analyst with a B.Tech in Computer Science (CGPA 8.3/10) from 
                Centurion University. I specialize in transforming complex datasets into meaningful 
                insights that drive business decisions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                With expertise in SQL, Python, Power BI, and Excel, I've successfully delivered 
                multiple projects handling up to 1.8 million records, achieving significant 
                performance improvements and cost reductions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                  <item.icon className="text-3xl text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">🎓 Education</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-white font-semibold text-lg">B.Tech in Computer Science</p>
                  <p className="text-gray-400">Centurion University Of Technology And Management</p>
                  <p className="text-purple-500 text-sm mt-1">CGPA: 8.3/10</p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <p className="text-white font-semibold text-lg">Data Analytics Internship</p>
                  <p className="text-gray-400">MedTourEasy</p>
                  <p className="text-purple-500 text-sm mt-1">Oct 2023</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <FaCertificate className="text-purple-500" />
                🏆 Certifications
              </h3>
              <div className="space-y-4">
                {certificates.map((cert, idx) => (
                  <a
                    key={idx}
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`bg-gradient-to-r ${cert.color} rounded-lg p-2 flex-shrink-0`}>
                        <cert.icon className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                              {cert.name}
                            </h4>
                            <p className="text-sm text-gray-400">{cert.issuer}</p>
                            <p className="text-xs text-purple-500 mt-1">{cert.date}</p>
                          </div>
                          <FaExternalLinkAlt className="text-gray-500 group-hover:text-purple-500 transition-colors flex-shrink-0 mt-1" size={12} />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              
              {/* View All Certificates Button */}
              <div className="mt-6 text-center">
                <a
                  href="#certifications"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm"
                >
                  View All Certificates
                  <FaExternalLinkAlt size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;