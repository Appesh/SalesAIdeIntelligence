import { Brain, TrendingUp, Zap } from "lucide-react";

interface AvatarProps {
  name: string;
  role: string;
  color: string;
  icon: React.ReactNode;
  description: string;
}

const avatars: AvatarProps[] = [
  {
    name: "Analytica",
    role: "Data Analyst",
    color: "bg-wegic-purple",
    icon: <Brain className="w-6 h-6 text-white" />,
    description: "I analyze your sales data to find hidden opportunities"
  },
  {
    name: "Growtho",
    role: "Growth Strategist", 
    color: "bg-wegic-pink",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    description: "I create personalized strategies to boost your sales"
  },
  {
    name: "Optimax",
    role: "Automation Expert",
    color: "bg-wegic-green", 
    icon: <Zap className="w-6 h-6 text-white" />,
    description: "I automate your campaigns for maximum efficiency"
  }
];

export function AIAvatars() {
  return (
    <div className="flex justify-center items-center space-x-8 py-12">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Meet Your AI Team</h3>
        <p className="text-gray-600 mb-8">Three AI specialists working together to grow your business</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          {avatars.map((avatar, index) => (
            <div key={index} className="text-center group">
              <div className={`w-24 h-24 ${avatar.color} rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl animate-float icon-container-enhanced`}>
                {avatar.icon}
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">{avatar.name}</h4>
              <p className="text-sm text-gray-600 font-medium mb-2">{avatar.role}</p>
              <p className="text-xs text-gray-500 max-w-xs">{avatar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FloatingAvatars() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex space-x-2">
        {avatars.slice(0, 2).map((avatar, index) => (
          <div
            key={index}
            className={`w-14 h-14 ${avatar.color} rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 animate-bounce-slow icon-container-enhanced`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            {avatar.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
