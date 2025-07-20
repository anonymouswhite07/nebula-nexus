import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin, Download, Terminal, Palette, X, Menu, Code, Database, Wrench, Star, Calendar, User, FolderOpen, FileText, MessageCircle, Home } from 'lucide-react';

const Portfolio = () => {
  const [currentTheme, setCurrentTheme] = useState('neon-green');
  const [activeSection, setActiveSection] = useState('home');
  const [showConsole, setShowConsole] = useState(false);
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState(['Welcome to ANONYMOUS Console v1.0', 'Type "help" for available commands']);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const consoleRef = useRef(null);

  const themes = {
    'neon-green': {
      primary: 'from-green-400 to-emerald-600',
      secondary: 'from-green-500 to-green-700',
      accent: 'border-green-400',
      glow: 'shadow-green-400/50',
      text: 'text-green-400'
    },
    'neon-purple': {
      primary: 'from-purple-400 to-violet-600',
      secondary: 'from-purple-500 to-purple-700',
      accent: 'border-purple-400',
      glow: 'shadow-purple-400/50',
      text: 'text-purple-400'
    },
    'neon-blue': {
      primary: 'from-blue-400 to-cyan-600',
      secondary: 'from-blue-500 to-blue-700',
      accent: 'border-blue-400',
      glow: 'shadow-blue-400/50',
      text: 'text-blue-400'
    },
    'neon-orange': {
      primary: 'from-orange-400 to-red-600',
      secondary: 'from-orange-500 to-orange-700',
      accent: 'border-orange-400',
      glow: 'shadow-orange-400/50',
      text: 'text-orange-400'
    }
  };

  const theme = themes[currentTheme];

  const projects = [
    {
      id: 1,
      title: 'AI-in-education',
      description: 'A smart task management app with AI-driven priority suggestions and natural language processing.',
      tech: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
      github: 'https://github.com/anonymouswhite07/AI-in-education',
      demo: 'https://ai-task-manager.vercel.app',
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'AI-for-crime-pattern-Analysis',
      description: 'Secure, transparent voting platform built on Ethereum with smart contracts.',
      tech: ['Solidity', 'React', 'Web3.js', 'Hardhat'],
      github: 'https://github.com/anonymouswhite07/AI-for-crime-pattern-Analysis',
      demo: 'https://blockchain-voting.netlify.app',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Real-time Chat App',
      description: 'Full-featured chat application with rooms, file sharing, and video calls.',
      tech: ['Socket.io', 'React', 'Express', 'WebRTC'],
      github: 'https://github.com/anonymouswhite07',
      demo: 'https://realtime-chat-app.herokuapp.com',
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'ML Weather Predictor',
      description: 'Weather prediction model using machine learning with interactive visualizations.',
      tech: ['Python', 'TensorFlow', 'Flask', 'D3.js'],
      github: 'https://github.com/anonymouswhite07',
      demo: 'https://ml-weather-predictor.com',
      image: '/api/placeholder/400/250'
    }
  ];

  const skills = {
    Frontend: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    Backend: ['Node.js', 'Python', 'Express', 'Django', 'PostgreSQL'],
    Tools: ['Git', 'Docker', 'AWS', 'Firebase', 'Figma']
  };

  const education = [
    {
      year: '2024-2028',
      degree: 'Bachelor of Information Technology',
      institution: 'Gnanamani College Of Technology',
      description: 'Pursuing a Degree in Information Technology'
    },
    {
      year: '2022-2024',
      degree: 'HSC',
      institution: 'Govt. Higher Sec School',
      description: 'Graduated with honors, President of Computer Science Club'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyX') {
        e.preventDefault();
        setShowConsole(!showConsole);
      }
      if (e.code === 'Backquote' && !showConsole) {
        e.preventDefault();
        setShowConsole(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConsole]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  const handleConsoleCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    let output = '';
    
    switch (cmd) {
      case 'help':
        output = 'Available commands: about, projects, skills, contact, clear, theme [color], exit';
        break;
      case 'about':
        output = 'Full-stack developer passionate about creating innovative web solutions with cutting-edge technologies.';
        break;
      case 'projects':
        output = `Current projects: ${projects.map(p => p.title).join(', ')}`;
        break;
      case 'skills':
        output = 'Technologies: React, Node.js, Python, TypeScript, AI/ML, Blockchain, and more!';
        break;
      case 'contact':
        output = 'Email: your.email@domain.com | Phone: +1 (555) 123-4567';
        break;
      case 'clear':
        setConsoleOutput(['Console cleared']);
        setConsoleInput('');
        return;
      case 'exit':
        setShowConsole(false);
        setConsoleInput('');
        return;
      default:
        if (cmd.startsWith('theme ')) {
          const color = cmd.split(' ')[1];
          if (themes[`neon-${color}`]) {
            setCurrentTheme(`neon-${color}`);
            output = `Theme changed to ${color}`;
          } else {
            output = 'Available themes: green, purple, blue, orange';
          }
        } else {
          output = `Command not found: ${command}. Type "help" for available commands.`;
        }
    }
    
    setConsoleOutput(prev => [...prev, `> ${command}`, output]);
    setConsoleInput('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    }, 2000);
  };

  const ParticleBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-gradient-to-r ${theme.primary} rounded-full animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  const GlowButton = ({ children, onClick, className = '', variant = 'primary' }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
        variant === 'primary' 
          ? `bg-gradient-to-r ${theme.primary} text-black shadow-lg ${theme.glow} hover:shadow-xl`
          : `border-2 ${theme.accent} ${theme.text} hover:bg-gradient-to-r ${theme.primary} hover:text-black`
      } ${className}`}
    >
      {children}
    </button>
  );

  const ProjectCard = ({ project }) => (
    <div className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border ${theme.accent} ${theme.glow} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="bg-gray-800 h-48 rounded-lg mb-4 flex items-center justify-center">
        <Code className={`w-12 h-12 ${theme.text}`} />
      </div>
      <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${theme.secondary} text-white`}
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${theme.accent} ${theme.text} hover:bg-gradient-to-r ${theme.primary} hover:text-black transition-all duration-300`}
        >
          <Github className="w-4 h-4" />
          Code
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${theme.primary} text-black hover:shadow-lg transition-all duration-300`}
        >
          <ExternalLink className="w-4 h-4" />
          Demo
        </a>
      </div>
    </div>
  );

  const SkillCategory = ({ category, skills }) => (
    <div className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border ${theme.accent} ${theme.glow}`}>
      <h3 className={`text-xl font-bold mb-4 ${theme.text} flex items-center gap-2`}>
        {category === 'Frontend' && <Code className="w-5 h-5" />}
        {category === 'Backend' && <Database className="w-5 h-5" />}
        {category === 'Tools' && <Wrench className="w-5 h-5" />}
        {category}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r ${theme.secondary} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ParticleBackground />
      
      {/* nav*/}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className={`text-2xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
              ANONYMOUS
            </div>
            
            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'skills', 'resume', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:${theme.text} transition-colors duration-300 ${
                    activeSection === item ? theme.text : 'text-gray-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* theme */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setShowConsole(!showConsole)}
                className={`p-2 rounded-lg border ${theme.accent} ${theme.text} hover:bg-gradient-to-r ${theme.primary} hover:text-black transition-all duration-300`}
              >
                <Terminal className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {Object.keys(themes).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => setCurrentTheme(themeKey)}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${themes[themeKey].primary} ${
                      currentTheme === themeKey ? 'ring-2 ring-white' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* mobile Menu */}
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* mobile nav */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 mt-4">
                {['home', 'about', 'projects', 'skills', 'resume', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-left hover:${theme.text} transition-colors duration-300 ${
                      activeSection === item ? theme.text : 'text-gray-400'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* console */}
      {showConsole && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`bg-gray-900 rounded-xl border ${theme.accent} ${theme.glow} w-full max-w-2xl h-96 flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Terminal className={`w-5 h-5 ${theme.text}`} />
                <span className={`font-bold ${theme.text}`}>ANONYMOUS Console</span>
              </div>
              <button
                onClick={() => setShowConsole(false)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
              {consoleOutput.map((line, i) => (
                <div key={i} className={line.startsWith('>') ? theme.text : 'text-gray-300'}>
                  {line}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <span className={theme.text}>{'>'}</span>
                <input
                  ref={consoleRef}
                  type="text"
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleConsoleCommand(consoleInput);
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-white"
                  placeholder="Type a command..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* body */}
      <section id="home" className="min-h-screen flex items-center justify-center text-center relative">
        <div className="container mx-auto px-6 z-10">
          <div className="mb-8">
            <h1 className={`text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent animate-pulse`}>
              JONATHAN S
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-6">
              Full-Stack Developer & AI Enthusiast
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Crafting innovative digital experiences with cutting-edge technologies. 
              Passionate about AI, blockchain, and creating solutions that make a difference.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <GlowButton onClick={() => scrollToSection('projects')}>
              View My Work
            </GlowButton>
            <GlowButton onClick={() => scrollToSection('contact')} variant="outline">
              Get In Touch
            </GlowButton>
          </div>
          
          <button
            onClick={() => scrollToSection('about')}
            className={`animate-bounce ${theme.text} hover:scale-110 transition-transform duration-300`}
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* about  */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`w-64 h-64 mx-auto bg-gradient-to-r ${theme.primary} rounded-full flex items-center justify-center mb-8`}>
                <User className="w-32 h-32 text-black" />
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with a deep love for creating innovative digital solutions. 
                With expertise in modern web technologies and a keen interest in artificial intelligence, 
                I strive to build applications that not only look great but also solve real-world problems.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring the latest tech trends, contributing to open-source projects, 
                or experimenting with new frameworks. I believe in continuous learning and pushing the boundaries of what's possible.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <div className={`flex items-center gap-2 ${theme.text}`}>
                  <MapPin className="w-5 h-5" />
                  <span>Salem, TamilNadu, IN</span>
                </div>
                <div className={`flex items-center gap-2 ${theme.text}`}>
                  <Star className="w-5 h-5" />
                  <span>3 Years Experience</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Edu */}
          <div className="mt-20">
            <h3 className={`text-2xl font-bold mb-8 ${theme.text} flex items-center gap-2`}>
              <Calendar className="w-6 h-6" />
              Education
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, i) => (
                <div key={i} className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border ${theme.accent} ${theme.glow}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h4 className={`text-xl font-bold ${theme.text}`}>{edu.degree}</h4>
                    <span className="text-gray-400">{edu.year}</span>
                  </div>
                  <p className="text-gray-300 mb-2">{edu.institution}</p>
                  <p className="text-gray-400">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* project */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <GlowButton onClick={() => window.open('https://github.com/anonymouswhite07', '_blank')}>
              View All Projects on GitHub
            </GlowButton>
          </div>
        </div>
      </section>

      {/* skill */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <SkillCategory key={category} category={category} skills={skillList} />
            ))}
          </div>
        </div>
      </section>

      {/* resume*/}
      <section id="resume" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
            Resume
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border ${theme.accent} ${theme.glow}`}>
              <div className="text-center mb-8">
                <FileText className={`w-16 h-16 mx-auto mb-4 ${theme.text}`} />
                <p className="text-gray-300 mb-6">
                  Download my resume to learn more about my experience and qualifications.
                </p>
                
                 <GlowButton onClick={() => window.open('/resume.pdf', '_blank')}>
        <Download className="w-5 h-5 mr-2" />
        Download Resume (PDF)
      </GlowButton>
              </div>
              
              {/* resume  pre*/}
              <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 mt-8">
 <div className="w-full h-[700px] overflow-hidden rounded-lg bg-gray-800">
  <embed
    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
    type="application/pdf"
    className="w-full h-full"
  />
</div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/*contact */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl font-bold text-center mb-16 bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
            Get In Touch
          </h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            {/* contact */}
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${theme.text}`}>Let's Connect</h3>
                <p className="text-gray-300 mb-8">
                  I'm always open to discussing new opportunities, collaborating on interesting projects, 
                  or just having a chat about technology. Feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-4">
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${theme.accent} ${theme.glow}`}>
                  <Mail className={`w-6 h-6 ${theme.text}`} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-400">jonathanimmanue007@email.com</p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${theme.accent} ${theme.glow}`}>
                  <Phone className={`w-6 h-6 ${theme.text}`} />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-400">+91 6381716235</p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-lg border ${theme.accent} ${theme.glow}`}>
                  <MapPin className={`w-6 h-6 ${theme.text}`} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-400">Salem, TamilNadu, IN</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cont form */}
            <div className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border ${theme.accent} ${theme.glow}`}>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${theme.accent} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.text}`}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${theme.accent} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.text}`}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${theme.text}`}>
                    Message
                  </label>
                  <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${theme.accent} focus:outline-none focus:ring-2 focus:ring-opacity-50 ${theme.text}`}
                  required
                  />
                  </div>
                  <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                  } bg-gradient-to-r ${theme.primary} text-black shadow-lg ${theme.glow}`}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                   </form>
            </div>
          </div>
        </div>
      </section>

      {/* fot */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 JONATHAN. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;


