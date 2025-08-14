import { Persona } from '@/types/type';
import { FaUser, FaCode, FaChartLine } from 'react-icons/fa';

type Props = {
  persona: Persona
}

export default function PersonaCard({ persona } : Props) {
  const getPersonaIcon = (name: string) => {
    if (name.includes('Hitesh')) return <FaCode className="text-lg" />;
    if (name.includes('Piyush')) return <FaChartLine className="text-lg" />;
    return <FaUser className="text-lg" />;
  };

  const getPersonaColor = (name: string) => {
    if (name.includes('Hitesh')) return 'blue';
    if (name.includes('Piyush')) return 'purple';
    return 'gray';
  };

  const color = getPersonaColor(persona.name);

    return (
      <div className="p-6 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg bg-${color}-600 flex items-center justify-center text-white mr-4`}>
            {persona.avatar ? (
              <img 
                src={persona.avatar} 
                alt={persona.name}
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              getPersonaIcon(persona.name)
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{persona.name}</h3>
            <p className="text-gray-400 text-sm">{persona.role}</p>
          </div>
        </div>

        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
          {persona.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {persona.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded bg-gray-700/50 text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center text-xs text-green-400">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
          Online
        </div>
      </div>
    );
}
