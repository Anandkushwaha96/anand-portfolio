import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaChartLine, FaDatabase, FaRocket, FaTachometerAlt } from 'react-icons/fa';

const DataStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: FaDatabase, label: 'Data Processed', value: '2.5M+', color: 'from-blue-500 to-cyan-500' },
    { icon: FaChartLine, label: 'Efficiency Gain', value: '35%', color: 'from-green-500 to-emerald-500' },
    { icon: FaRocket, label: 'Projects Delivered', value: '8+', color: 'from-purple-500 to-pink-500' },
    { icon: FaTachometerAlt, label: 'Query Speed', value: '40%', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`text-center transform transition-all duration-700 ${
                inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className={`relative bg-gradient-to-r ${stat.color} rounded-full p-4 w-16 h-16 mx-auto flex items-center justify-center`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataStats;