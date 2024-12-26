import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle, Shield, Zap, Users, Globe, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

// Keeping the original CountUp component unchanged
const CountUp = ({ end, duration = 2000, suffix = '', startCounting }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(0);
    
    if (!startCounting) {
      return;
    }
    
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration, startCounting]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Landing = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStatsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      {/* Enhanced Navigation */}
      <nav className="backdrop-blur-sm bg-white/70 fixed w-full z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
          <Link to="/"> 
            <div className="flex items-center space-x-3">
             <MessageCircle className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">ChatFlow</span>
            </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <Link to="/login">
                <button className="px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
                  Login
                </button>
              </Link>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-indigo-100 rounded-full">
            <span className="text-indigo-600 font-medium">New: Group Video Calls ❤️</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
            Connect and Chat<br />Without Limits
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience seamless communication with our modern chat platform. Connect with anyone, anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 flex items-center justify-center space-x-2">
              <span>Start Chatting Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="group px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-4">Why Choose ChatFlow?</h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
          Built with cutting-edge technology to provide the best chat experience possible.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="h-8 w-8 text-indigo-600" />}
            title="Lightning Fast"
            description="Experience real-time messaging with zero lag. Our platform ensures your messages are delivered instantly."
          />
          <FeatureCard 
            icon={<Shield className="h-8 w-8 text-indigo-600" />}
            title="Secure & Private"
            description="End-to-end encryption keeps your conversations private and secure. Your data is always protected."
          />
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-indigo-600" />}
            title="Group Chats"
            description="Create groups for team collaboration, family, or friends. Stay connected with everyone who matters."
          />
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div ref={statsRef} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-bold mb-3">
                <CountUp end={10000000} duration={3000} suffix="+" startCounting={isStatsVisible} />
              </div>
              <div className="text-indigo-100 text-lg">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-bold mb-3">
                <CountUp end={150} duration={2000} suffix="+" startCounting={isStatsVisible} />
              </div>
              <div className="text-indigo-100 text-lg">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="text-5xl font-bold mb-3">
                <CountUp end={99.9} duration={2500} suffix="%" startCounting={isStatsVisible} />
              </div>
              <div className="text-indigo-100 text-lg">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  ChatFlow
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Making communication seamless and enjoyable for everyone, everywhere.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Product</h3>
              <div className="space-y-4">
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Security</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Company</h3>
              <div className="space-y-4">
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">About</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Careers</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-6 text-gray-900">Legal</h3>
              <div className="space-y-4">
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-xl transition-shadow duration-300">
      <div className="p-3 bg-indigo-50 rounded-xl w-fit mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Landing;