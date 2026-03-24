import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendar, FaUsers, FaCode } from 'react-icons/fa';

const LiveStats = () => {
  const [time, setTime] = useState(new Date());
  const [visitorCount] = useState(Math.floor(Math.random() * 1000) + 500);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-purple-500/30 shadow-lg">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaClock className="text-purple-500" />
            <span className="text-white">{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendar className="text-purple-500" />
            <span className="text-white">{time.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-purple-500" />
            <span className="text-white">{visitorCount}+ views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;