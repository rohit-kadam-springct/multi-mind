"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PersonaCard from '../../components/PersonaCard';
import { FaRocket, FaBrain, FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';
import { BiCode } from 'react-icons/bi';

export default function Home() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const personas = [
    {
      id: 1,
      name: "Hitesh Choudhary",
      role: "Tech Educator & YouTube Creator",
      description: "Friendly tech educator from Jaipur, specializing in programming and cybersecurity",
      skills: ["Python", "Web Development", "Cybersecurity", "Teaching", "Cloud Technologies", "PHP"],
      avatar: "images/hitesh-avatar.png",
      expertise: "Programming education, IT security research, and making complex tech concepts accessible to everyone"
    },
    {
      id: 2,
      name: "Piyush Garg",
      role: "Software Engineer & Entrepreneur",
      description: "Founder of Teachyst LMS, expert in system design and full-stack development",
      skills: ["System Design", "Docker", "Next.js", "Full-Stack Development", "LMS Development", "Microservices"],
      avatar: "images/piyush-avatar.webp",
      expertise: "Building scalable systems, educational platforms, and teaching modern web architecture"
    }
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/rohit-kadam-springct", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/rohit-b-kadam", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com/imRohitKadam", label: "Twitter" },
    { icon: FaDiscord, href: "https://discord.gg/rohitkadamdev", label: "Discord" }
  ];

  const handleConnect = () => {
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white overflow-hidden relative">
      {/* Simple Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main Content */}
        <header className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left Side */}
              <div className="text-left space-y-8">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <FaBrain className="text-2xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-6xl font-bold text-white">
                      Multi<span className="text-blue-400">Mind</span>
                    </h1>
                    <div className="h-1 w-24 bg-blue-500 rounded-full mt-2"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-2xl font-semibold text-blue-400">
                    Best minds. One conversation.
                  </p>

                  <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                    AI-powered group chat where specialized personas respond based on their unique skills.
                    Smart routing chooses the perfect expert for every question.
                  </p>
                </div>

                {/* Simple Features */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <BiCode className="text-2xl text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">Smart Routing</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <FaBrain className="text-2xl text-purple-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">Expert</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <HiLightningBolt className="text-2xl text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300">Multi Model</div>
                  </div>
                </div>

                {/* Connect Button */}
                <div className="pt-4">
                  <button
                    onClick={handleConnect}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="px-8 py-4 text-lg font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <span className="flex items-center text-white">
                      <FaRocket className={`mr-3 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
                      Start Conversation
                    </span>
                  </button>
                </div>

                {/* Social Links */}
                <div className="space-y-3 pt-4">
                  <div className="text-sm text-gray-400">Connect with me:</div>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                        title={social.label}
                      >
                        <social.icon className="text-xl text-gray-400 hover:text-white transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* ChaiCode Attribution */}
                <div className="text-sm text-gray-500 pt-4 border-t border-gray-800">
                  <span>Assignment by </span>
                  <a
                    href="https://chaicode.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    chaicode.com
                  </a>
                </div>
              </div>

              {/* Right Side - Personas */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Meet Your AI Experts
                  </h2>
                  <p className="text-gray-400">Specialized personas ready to help</p>
                </div>
                <div className="space-y-4">
                  {personas.map((persona) => (
                    <PersonaCard key={persona.id} persona={persona} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
