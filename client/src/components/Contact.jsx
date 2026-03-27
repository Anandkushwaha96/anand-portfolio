import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa';
import axios from 'axios';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    loading: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });
    
    try {
      // Use the live backend URL directly
      const API_URL = 'https://anand-portfolio-api.onrender.com';
      const response = await axios.post(`${API_URL}/api/contact`, formData);
      
      console.log('Response:', response.data);
      
      setStatus({
        submitted: true,
        loading: false,
        success: true,
        message: response.data.message || '✅ Message sent successfully!'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error details:', error);
      console.error('Error response:', error.response);
      
      setStatus({
        submitted: true,
        loading: false,
        success: false,
        message: error.response?.data?.message || ' free trial has expired. The server will be activated after payment. Please contact through telegram.'
      });
    }
    
    setTimeout(() => {
      setStatus({ submitted: false, loading: false, success: false, message: '' });
    }, 5000);
  };
  
  return (
    <section id="contact" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
          <p className="text-gray-400 mt-4">I'd love to hear from you</p>
        </div>
        
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:learncoding691@gmail.com" className="text-white hover:text-purple-500">
                      learncoding691@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-purple-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Anandkushwaha96"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a
                  href="https://linkedin.com/in/anandkushwaha23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  <FaLinkedin className="text-xl" />
                </a>
                <a
                  href="https://t.me/Akkumarw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300"
                >
                  <FaTelegram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {status.loading ? '📧 Sending...' : '✉️ Send Message'}
              </button>
              {status.submitted && (
                <div className={`p-3 rounded-lg text-center ${
                  status.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;