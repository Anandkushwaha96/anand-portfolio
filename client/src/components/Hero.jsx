import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = ['Data Analyst 📊'];
  
  useEffect(() => {
    let currentText = '';
    let isDeleting = false;
    let roleIndex = 0;
    
    const type = () => {
      const fullText = roles[roleIndex % roles.length];
      
      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }
      
      setText(currentText);
      
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        roleIndex++;
      }
      
      setTimeout(type, isDeleting ? 100 : 150);
    };
    
    type();
  }, []);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/anand23.pdf';
    link.download = '/anand23.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-4 animate-pulse">
                👋 Welcome to my portfolio
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Anand Kumar
              </span>
            </h1>
            <div className="text-2xl md:text-3xl mb-6 h-20">
              <span className="text-gray-300"> </span>
              <span className="text-purple-500 font-semibold">{text}</span>
            </div>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto md:mx-0">
              Turning data into clear and meaningful insights using Python, SQL, and Power BI.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={handleDownload}
                className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">Download Resume</span>
                <FaDownload className="relative z-10 group-hover:translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Contact Me
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          {/* Right Content - Profile Photo */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Animated Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin-slow" style={{ padding: '3px' }}>
                <div className="absolute inset-0 rounded-full bg-black"></div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-purple-500 shadow-2xl">
                <img 
                  src="/images/profile.png"
                  alt="Anand Kumar"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
              
              {/* Single Floating Badge */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 shadow-lg animate-bounce">
                <div className="bg-white rounded-full px-3 py-1 text-sm font-bold text-purple-600">
                  Data Analyst
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;